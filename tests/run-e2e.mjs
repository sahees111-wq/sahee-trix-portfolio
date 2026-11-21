import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "playwright";

const BASE = process.env.QA_BASE_URL || "http://127.0.0.1:4173";
const OUT = "qa-artifacts";
const viewports = [
  { name: "desktop-1440", width: 1440, height: 900, mobile: false, touch: false },
  { name: "tablet-1024", width: 1024, height: 768, mobile: false, touch: false },
  { name: "mobile-390", width: 390, height: 844, mobile: true, touch: true },
  { name: "mobile-360", width: 360, height: 800, mobile: true, touch: true },
];
const slugs = [
  "valkyrie-esports-championship-kit",
  "aurum-luxe-botanicals-packaging",
  "nexus-cybernetics-brand-system",
  "hyperdrive-energy-campaign",
  "synth-visions-ai-fashion-campaign",
  "luminous-night-festival-social",
  "colombo-strikers-cricket-kit",
  "chroma-press-corporate-brochure",
];
const report = { viewports: [], caseStudies: [], games: [], errors: [], externalWarnings: [], timings: [] };

function attachDiagnostics(page) {
  const issues = { pageErrors: [], consoleErrors: [], localHttpErrors: [], localRequestFailures: [] };
  page.on("pageerror", error => issues.pageErrors.push(String(error)));
  page.on("console", message => { if (message.type() === "error") issues.consoleErrors.push(message.text()); });
  page.on("response", response => {
    if (response.url().startsWith(BASE) && response.status() >= 400) {
      issues.localHttpErrors.push(response.status() + " " + response.url());
    }
    if (!response.url().startsWith(BASE) && response.status() >= 400) {
      report.externalWarnings.push(response.status() + " " + response.url());
    }
  });
  page.on("requestfailed", request => {
    const failure = request.failure()?.errorText || "request failed";
    if (request.url().startsWith(BASE) && !failure.includes("ERR_ABORTED")) {
      issues.localRequestFailures.push(failure + " " + request.url());
    } else if (!request.url().startsWith(BASE) && !failure.includes("ERR_ABORTED")) {
      report.externalWarnings.push(failure + " " + request.url());
    }
  });
  return issues;
}

async function checkNoHorizontalOverflow(page, label) {
  const metrics = await page.evaluate(() => ({
    viewport: window.innerWidth,
    document: document.documentElement.scrollWidth,
    body: document.body ? document.body.scrollWidth : 0,
  }));
  assert.ok(metrics.document <= metrics.viewport + 1,
    label + " has horizontal document overflow: " + JSON.stringify(metrics));
  return metrics;
}

async function finishDiagnostics(issues, label) {
  const all = [
    ...issues.pageErrors.map(x => "pageerror: " + x),
    ...issues.localHttpErrors.map(x => "local HTTP: " + x),
    ...issues.localRequestFailures.map(x => "local request: " + x),
    ...issues.consoleErrors.map(x => "console: " + x),
  ];
  if (all.length) {
    report.errors.push({ page: label, errors: all });
    assert.equal(all.length, 0, label + " browser diagnostics: " + all.join(" | "));
  }
}

async function openRoute(page, url) {
  const response = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
  assert.ok(response && response.status() === 200,
    "Expected HTTP 200 for " + url + ", received " + (response?.status() || "no response"));
  return response;
}

async function skipIntro(page) {
  try { await page.getByRole("button", { name: /Skip Intro/ }).click({ timeout: 1200 }); } catch {}
  await page.waitForTimeout(450);
}

async function sampleTranslateX(page, selector) {
  return page.locator(selector).evaluate(node => {
    const value = getComputedStyle(node).transform;
    if (!value || value === "none") return 0;
    return new DOMMatrixReadOnly(value).m41;
  });
}

async function homeAudit(browser, viewport) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    isMobile: viewport.mobile, hasTouch: viewport.touch, reducedMotion: "no-preference",
  });
  const page = await context.newPage();
  const issues = attachDiagnostics(page);
  try {
    const started = Date.now();
    await openRoute(page, BASE + "/");
    await skipIntro(page);
    await page.locator("main#site-top").waitFor();
    const homeTiming = await page.evaluate(() => {
      const nav = performance.getEntriesByType("navigation")[0];
      return nav ? { domContentLoadedMs: Math.round(nav.domContentLoadedEventEnd), loadMs: Math.round(nav.loadEventEnd) } : null;
    });
    report.timings.push({ viewport: viewport.name, route: "/", elapsedMs: Date.now() - started, navigation: homeTiming });

    assert.equal(await page.locator('a[href="/play"]').filter({ hasText: "PLAY WITH ME" }).count(), 1,
      "Home must contain exactly one hero Play With Me link before opening mobile navigation");
    assert.equal(await page.locator("section.hero-safe-screen").getByRole("link", { name: /HIRE ME/ }).count(), 1,
      "Hero section must contain one Hire Me link; a separate navbar HIRE ME link is expected");
    for (const id of ["about", "services", "work", "jersey", "print", "experience", "capabilities", "ai-tools", "contact"]) {
      assert.equal(await page.locator("#" + id).count(), 1, "Missing or duplicate home section #" + id);
    }

    const anchorAudit = await page.locator('a[href^="#"]').evaluateAll(links =>
      links.map(link => link.getAttribute("href")).filter(href => href && href !== "#" && !document.getElementById(href.slice(1))),
    );
    assert.deepEqual(anchorAudit, [], "Home has broken in-page anchors");

    const sections = page.locator("main > section");
    const sectionCount = await sections.count();
    assert.ok(sectionCount >= 12, "Expected the full home section stack, found " + sectionCount);
    for (let i = 0; i < sectionCount; i += 1) {
      await sections.nth(i).evaluate(node => node.scrollIntoView({ block: "center", behavior: "instant" }));
      await page.waitForTimeout(90);
      await checkNoHorizontalOverflow(page, viewport.name + " home section " + i);
    }

    const localImages = await page.locator("main img").evaluateAll(images =>
      images.filter(img => img.currentSrc.startsWith(location.origin) && img.complete && img.naturalWidth === 0)
        .map(img => img.currentSrc || img.src),
    );
    assert.deepEqual(localImages, [], "Broken local image assets on home page");

    const contact = page.locator("#contact");
    assert.ok(await contact.locator('a[href^="mailto:"]').count() > 0, "Contact section is missing an email link");
    assert.ok(await contact.locator('a[href^="https://wa.me/"]').count() > 0, "Contact section is missing a WhatsApp link");

    await page.locator("#work").evaluate(node => node.scrollIntoView({ block: "start", behavior: "instant" }));
    await page.waitForTimeout(200);
    await page.locator(".portfolio-card").first().click();
    await page.getByRole("button", { name: "Close Case Study" }).waitFor();
    assert.ok(await page.locator("text=Independent portfolio study").count() > 0, "Case-study modal context is missing");
    await page.keyboard.press("Escape");
    await page.getByRole("button", { name: "Close Case Study" }).waitFor({ state: "detached" });

    await page.getByRole("button", { name: "PACKAGING", exact: true }).click();
    assert.ok(await page.locator(".portfolio-card").count() > 0, "Portfolio category filter returned no cards");
    await page.getByRole("button", { name: "ALL", exact: true }).click();

    await page.locator("#capabilities").evaluate(node => node.scrollIntoView({ block: "center", behavior: "instant" }));
    await page.locator("#ai-tools").evaluate(node => node.scrollIntoView({ block: "center", behavior: "instant" }));
    await page.waitForTimeout(350);
    const capStart = await sampleTranslateX(page, ".marquee-track");
    const aiStart = await sampleTranslateX(page, ".ai-model-marquee-track");
    await page.waitForTimeout(1050);
    const capEnd = await sampleTranslateX(page, ".marquee-track");
    const aiEnd = await sampleTranslateX(page, ".ai-model-marquee-track");
    const capDelta = capEnd - capStart;
    const aiDelta = aiEnd - aiStart;
    assert.ok(capDelta < -0.5, "Creative capabilities marquee is not moving left: delta=" + capDelta);
    assert.ok(aiDelta > 0.5, "AI specialist marquee is not moving right: delta=" + aiDelta);
    assert.ok(capDelta * aiDelta < 0, "The two home marquees must move in opposite directions");

    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await checkNoHorizontalOverflow(page, viewport.name + " home top");
    if (viewport.mobile) {
      await page.getByRole("button", { name: "Toggle menu" }).click();
      const drawer = page.locator("div.fixed.inset-x-4.top-20").filter({ has: page.locator('a[href="/play"]') });
      assert.equal(await drawer.locator('a[href="/play"]').filter({ hasText: "PLAY WITH ME" }).count(), 1,
        "Mobile drawer must have exactly one Play With Me link");
      await drawer.locator('a[href="/play"]').click();
      await page.waitForURL("**/play");
      await checkNoHorizontalOverflow(page, viewport.name + " game portal");
    } else {
      await page.locator("section.hero-safe-screen a[href=\"/play\"]").click();
      await page.waitForURL("**/play");
      await checkNoHorizontalOverflow(page, viewport.name + " game portal");
    }

    assert.equal(await page.getByRole("button").filter({ hasText: "Play now" }).count(), 9,
      "Play portal must show all nine game cards");
    report.viewports.push({
      viewport: viewport.name, width: viewport.width, height: viewport.height,
      homeSections: sectionCount, localImages: "all checked local images loaded",
      marquee: { capabilitiesDelta: Number(capDelta.toFixed(2)), aiDelta: Number(aiDelta.toFixed(2)) },
      horizontalOverflow: false,
    });
    await page.screenshot({ path: OUT + "/" + viewport.name + "-play-portal.png", fullPage: true });
    await finishDiagnostics(issues, viewport.name + " home/portal");
  } catch (error) {
    await page.screenshot({ path: OUT + "/" + viewport.name + "-failure.png", fullPage: true }).catch(() => {});
    throw error;
  } finally {
    await context.close();
  }
}

async function caseStudyAudit(browser, width, height, mobile) {
  for (const slug of slugs) {
    const context = await browser.newContext({
      viewport: { width, height }, isMobile: mobile, hasTouch: mobile, reducedMotion: "no-preference",
    });
    const page = await context.newPage();
    const issues = attachDiagnostics(page);
    try {
      await openRoute(page, BASE + "/work/" + slug);
      const heading = await page.locator("main h1").first().textContent();
      assert.ok(heading && heading.trim().length > 4, "Case study has no meaningful H1: " + slug);
      await checkNoHorizontalOverflow(page, slug + " at " + width);
      const images = await page.locator("main img").evaluateAll(nodes =>
        nodes.filter(img => img.currentSrc.startsWith(location.origin) && img.complete && img.naturalWidth === 0)
          .map(img => img.currentSrc || img.src),
      );
      assert.deepEqual(images, [], "Broken local image in case study " + slug);
      report.caseStudies.push({ slug, viewport: width + "x" + height, heading: heading.trim(), horizontalOverflow: false });
      await finishDiagnostics(issues, "case study " + slug + " " + width);
    } catch (error) {
      await page.screenshot({ path: OUT + "/case-" + slug + "-failure.png", fullPage: true }).catch(() => {});
      throw error;
    } finally {
      await context.close();
    }
  }
}

async function openGame(page, name) {
  await page.getByRole("button").filter({ hasText: name }).first().click();
  await page.getByRole("button", { name: /All games/i }).waitFor();
}

async function backToArcade(page) {
  await page.getByRole("button", { name: /All games/i }).click();
  await page.getByRole("button").filter({ hasText: "Play now" }).first().waitFor();
}

async function gamesAudit(browser) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "no-preference" });
  const page = await context.newPage();
  const issues = attachDiagnostics(page);
  try {
    await openRoute(page, BASE + "/play");
    await page.getByRole("heading", { name: /PLAY WITH ME/i }).waitFor();
    assert.equal(await page.getByRole("button").filter({ hasText: "Play now" }).count(), 9);
    await checkNoHorizontalOverflow(page, "game portal desktop");

    await openGame(page, "Neon Snake");
    await page.getByRole("button", { name: "Start game" }).click();
    await page.getByText("RUNNING", { exact: true }).waitFor();
    await page.keyboard.press("ArrowDown");
    await page.waitForTimeout(180);
    await page.getByRole("button", { name: /Pause/ }).click();
    await page.getByRole("button", { name: "Start", exact: true }).click();
    await page.getByRole("button", { name: "Restart", exact: true }).click();
    await page.getByRole("button", { name: /All games/ }).waitFor();
    report.games.push("Neon Snake: start, keyboard turn, pause, restart");

    await backToArcade(page);
    await openGame(page, "Chess Arena");
    await page.getByRole("button", { name: "e2 White pawn" }).click();
    await page.getByRole("button", { name: "e4 empty" }).click();
    await page.getByText("Black to move", { exact: true }).waitFor();
    await page.getByRole("button", { name: /Undo/ }).click();
    await page.getByText("White to move", { exact: true }).waitFor();
    await page.getByRole("button", { name: /Restart/ }).click();
    report.games.push("Chess: legal e2-e4, turn update, undo, restart");

    await backToArcade(page);
    await openGame(page, "Memory Flip");
    assert.equal(await page.getByRole("button", { name: "Reveal card" }).count(), 16);
    await page.getByRole("button", { name: "Reveal card" }).first().click();
    await page.getByRole("button", { name: "Reveal card" }).first().click();
    await page.getByRole("button", { name: "New shuffle" }).click();
    assert.equal(await page.getByRole("button", { name: "Reveal card" }).count(), 16);
    report.games.push("Memory Flip: reveal cards, match UI, shuffle reset");

    await backToArcade(page);
    await openGame(page, "2048 Rush");
    await page.keyboard.press("ArrowLeft");
    await page.keyboard.press("ArrowUp");
    await page.getByRole("button", { name: /Restart/ }).click();
    await page.getByText("SCORE", { exact: true }).waitFor();
    report.games.push("2048 Rush: keyboard moves, score panel, restart");

    await backToArcade(page);
    await openGame(page, "Reaction Lab");
    await page.getByRole("button", { name: /Start test/ }).click();
    await page.waitForFunction(() => {
      const zone = document.querySelector(".reaction-zone");
      return zone && zone.textContent.includes("TAP NOW!");
    }, null, { timeout: 7500 });
    await page.locator(".reaction-zone").click();
    assert.match(await page.locator(".reaction-zone").innerText(), /[0-9]+\s*ms/);
    await page.getByRole("button", { name: "Try again" }).click();
    await page.locator(".reaction-zone").click();
    await page.getByText("TOO EARLY!", { exact: true }).waitFor();
    report.games.push("Reaction Lab: timed signal, reaction result, early-click handling");

    await backToArcade(page);
    await openGame(page, "Pixel Studio");
    await page.getByRole("button", { name: "Paint pixel 1", exact: true }).click();
    await page.getByText("1 PIXELS", { exact: true }).waitFor();
    const downloadPromise = page.waitForEvent("download");
    await page.getByRole("button", { name: /Export PNG/ }).click();
    const download = await downloadPromise;
    assert.equal(download.suggestedFilename(), "saheetrix-pixel-art.png");
    await page.getByRole("button", { name: /Clear/ }).click();
    await page.getByText("0 PIXELS", { exact: true }).waitFor();
    report.games.push("Pixel Studio: brush, PNG export, clear");

    await backToArcade(page);
    await openGame(page, "Whack-a-Glitch");
    await page.getByRole("button", { name: /Start 20-second round/ }).click();
    const activeGlitch = page.getByRole("button", { name: "Whack active glitch" });
    await activeGlitch.waitFor();
    await activeGlitch.click();
    await page.getByText("10", { exact: true }).first().waitFor();
    await page.getByRole("button", { name: /Restart round/ }).click();
    report.games.push("Whack-a-Glitch: timed start, hit scoring, restart");

    await backToArcade(page);
    await openGame(page, "Tic-Tac-Toe");
    for (const square of ["1", "4", "2", "5", "3"]) {
      await page.getByRole("button", { name: "Square " + square + " empty" }).click();
    }
    await page.getByText("X WINS THE ROUND", { exact: true }).waitFor();
    await page.getByRole("button", { name: /Reset/ }).click();
    await page.getByText("PLAYER ONE • YOUR TURN", { exact: true }).waitFor();
    report.games.push("Tic-Tac-Toe: alternating turns, win detection, reset");

    await backToArcade(page);
    await openGame(page, "Simon Sequence");
    await page.getByRole("button", { name: /Start sequence/ }).click();
    await page.waitForFunction(() =>
      [...document.querySelectorAll('button[aria-label$="sequence pad"]')].some(button => !button.disabled),
    null, { timeout: 6500 });
    await page.locator('button[aria-label$="sequence pad"]:not([disabled])').first().click();
    await page.getByRole("button", { name: /Restart sequence/ }).click();
    report.games.push("Simon Sequence: display, input phase, input, restart");

    await checkNoHorizontalOverflow(page, "all-games portal after interactions");
    await page.screenshot({ path: OUT + "/all-games-desktop.png", fullPage: true });
    await finishDiagnostics(issues, "all games desktop");
  } catch (error) {
    await page.screenshot({ path: OUT + "/games-failure.png", fullPage: true }).catch(() => {});
    throw error;
  } finally {
    await context.close();
  }
}

async function mobileGameAudit(browser) {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: "no-preference",
  });
  const page = await context.newPage();
  const issues = attachDiagnostics(page);
  try {
    await openRoute(page, BASE + "/play");
    await openGame(page, "Neon Snake");
    await page.getByRole("button", { name: "Start game" }).click();
    await page.getByText("RUNNING", { exact: true }).waitFor();
    await page.getByRole("button", { name: "Move up" }).tap();
    await page.getByRole("button", { name: /Pause/ }).tap();
    await checkNoHorizontalOverflow(page, "mobile snake");
    await backToArcade(page);
    await openGame(page, "Tic-Tac-Toe");
    await page.getByRole("button", { name: "Square 1 empty" }).tap();
    assert.equal(await page.getByRole("button", { name: "Square 1 X" }).count(), 1,
      "Mobile touch should place the first Tic-Tac-Toe mark");
    await checkNoHorizontalOverflow(page, "mobile Tic-Tac-Toe");
    report.games.push("Mobile 390px: Snake D-pad touch and Tic-Tac-Toe tap");
    await finishDiagnostics(issues, "mobile touch games");
  } catch (error) {
    await page.screenshot({ path: OUT + "/mobile-games-failure.png", fullPage: true }).catch(() => {});
    throw error;
  } finally {
    await context.close();
  }
}

await mkdir(OUT, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage", "--use-gl=angle", "--use-angle=swiftshader"],
});
try {
  for (const viewport of viewports) await homeAudit(browser, viewport);
  await caseStudyAudit(browser, 1440, 900, false);
  await caseStudyAudit(browser, 390, 844, true);
  await gamesAudit(browser);
  await mobileGameAudit(browser);
  await writeFile(OUT + "/qa-report.json", JSON.stringify(report, null, 2));
  console.log("SAHEETRIX END-TO-END QA PASSED");
  console.log("Responsive viewports: " + report.viewports.length);
  console.log("Case-study route checks: " + report.caseStudies.length);
  console.log("Game interaction checks: " + report.games.length);
  console.log("Browser/network errors: " + report.errors.length);
  console.log("External resource warnings: " + report.externalWarnings.length);
  console.log(JSON.stringify(report, null, 2));
} catch (error) {
  report.errors.push({ fatal: String(error), stack: error?.stack || null });
  await writeFile(OUT + "/qa-report.json", JSON.stringify(report, null, 2));
  throw error;
} finally {
  await browser.close();
}
