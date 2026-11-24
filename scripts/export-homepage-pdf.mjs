import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

const baseUrl = process.env.PDF_BASE_URL || "http://127.0.0.1:4173";
const outputDir = "artifacts";
const screenshotPath = outputDir + "/saheetrix-homepage-full.png";
const width = 1440;
const height = 1000;

await mkdir(outputDir, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

try {
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 1.5,
    isMobile: false,
    // Respect reduced motion while preparing a static document capture.
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  const pageErrors = [];
  const consoleErrors = [];
  page.on("pageerror", error => pageErrors.push(String(error)));
  page.on("console", message => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });

  const response = await page.goto(baseUrl + "/", {
    waitUntil: "domcontentloaded",
    timeout: 90000,
  });
  if (!response || response.status() !== 200) {
    throw new Error("Homepage did not return HTTP 200: " + (response?.status() ?? "no response"));
  }

  // Let the site's own intro complete naturally; skip only if it exposes its own skip action.
  try {
    await page.getByRole("button", { name: /Skip Intro/i }).click({ timeout: 1500 });
  } catch {}
  await page.locator("main#site-top").waitFor({ timeout: 30000 });
  await page.evaluate(() => document.fonts.ready);

  // Reveal each page section and load the lazy assets before taking viewport captures.,  const sectionCount = await page.locator("main > section").count();,  await page.locator("main > section").evaluateAll(sections => {,    sections.forEach(section => section.classList.add("is-scroll-revealed"));,  });,  await page.waitForTimeout(700);,  // Force native lazy images to load, then wait for their decoded pixels.
  const imageReport = await page.locator("main img").evaluateAll(async images => {
    await Promise.all(images.map(async image => {
      image.loading = "eager";
      if (!image.complete) {
        await new Promise(resolve => {
          image.addEventListener("load", resolve, { once: true });
          image.addEventListener("error", resolve, { once: true });
          setTimeout(resolve, 12000);
        });
      }
      if (image.complete && image.naturalWidth > 0 && image.decode) {
        await image.decode().catch(() => {});
      }
    }));
    return images.map(image => ({
      src: image.currentSrc || image.src,
      loaded: image.complete && image.naturalWidth > 0,
      width: image.naturalWidth,
      height: image.naturalHeight,
    }));
  });

  // Capture overlapping viewport segments while each region is actually on screen.
  // This preserves scroll-triggered sections that Chromium fullPage screenshots can omit.
  const dimensions = await page.evaluate(() => ({
    width: document.documentElement.scrollWidth,
    height: Math.max(document.documentElement.scrollHeight, document.body.scrollHeight),
    title: document.title,
  }));
  const segmentDirectory = outputDir + "/segments";
  await mkdir(segmentDirectory, { recursive: true });
  const stride = height - 120;
  const maxScroll = Math.max(0, dimensions.height - height);
  const positions = [];
  for (let y = 0; y < maxScroll; y += stride) positions.push(y);
  if (positions.length === 0 || positions[positions.length - 1] !== maxScroll) positions.push(maxScroll);
  const motionVisibility = { hiddenBefore: 0, hiddenAfter: 0 };

  for (let index = 0; index < positions.length; index += 1) {
    const top = positions[index];
    await page.evaluate(y => window.scrollTo({ top: y, behavior: "instant" }), top);
    await page.waitForTimeout(950);

    // Fixed navigation and floating widgets belong to the first strip only.
    if (index > 0) {
      await page.evaluate(() => {
        const main = document.querySelector("main");
        document.querySelectorAll("body *").forEach(element => {
          if (main && !main.contains(element) && getComputedStyle(element).position === "fixed") {
            element.style.setProperty("visibility", "hidden", "important");
          }
        });
      });
    }

    // Resolve only animated elements that are within this visible viewport.
    const state = await page.locator("main").evaluate(root => {
      const candidates = Array.from(root.querySelectorAll("*"));
      const hidden = candidates.filter(element => {
        const style = getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        const inViewport = rect.bottom > 0 && rect.top < window.innerHeight;
        return inViewport && style.visibility !== "hidden" && style.display !== "none" &&
          Number(style.opacity) < 0.05 && rect.width > 1 && rect.height > 1;
      });
      hidden.forEach(element => {
        element.style.setProperty("opacity", "1", "important");
        element.style.setProperty("transform", "none", "important");
        element.style.setProperty("transition", "none", "important");
      });
      const remaining = candidates.filter(element => {
        const style = getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return rect.bottom > 0 && rect.top < window.innerHeight &&
          style.visibility !== "hidden" && style.display !== "none" &&
          Number(style.opacity) < 0.05 && rect.width > 1 && rect.height > 1;
      }).length;
      return { hiddenBefore: hidden.length, hiddenAfter: remaining };
    });
    motionVisibility.hiddenBefore += state.hiddenBefore;
    motionVisibility.hiddenAfter += state.hiddenAfter;

    const segmentPath = segmentDirectory + "/segment-" + String(index + 1).padStart(3, "0") + ".png";
    await page.screenshot({ path: segmentPath, type: "png", animations: "disabled", caret: "hide", timeout: 60000 });
  }

  const report = {
    url: baseUrl + "/",
    title: dimensions.title,
    viewport: { width, height },
    screenshot: outputDir + "/saheetrix-homepage-full.png",
    screenshotCssDimensions: { width: dimensions.width, height: dimensions.height },
    sections: sectionCount,
    revealedSections: await page.locator("main > section.is-scroll-revealed").count(),
    motionVisibility,
    segmentPositionsCss: positions,
    segmentCount: positions.length,
    documentHeightBeforeCapture: dimensions.height,
    images: imageReport,
    pageErrors,
    consoleErrors,
  };
  await (await import("node:fs/promises")).writeFile(
    outputDir + "/capture-report.json",
    JSON.stringify(report, null, 2),
  );

  if (pageErrors.length) {
    throw new Error("Browser runtime errors during capture: " + pageErrors.join(" | "));
  }
  if (dimensions.width > width + 1) {
    throw new Error("Unexpected horizontal overflow in capture: " + dimensions.width + "px");
  }
  console.log(JSON.stringify(report, null, 2));
  await context.close();

  // A page error is a capture blocker; external console warnings are recorded but don't
  // alter the rendered page or prevent the requested visual export.
  if (pageErrors.length) {
    throw new Error("Browser runtime errors during capture: " + pageErrors.join(" | "));
  }
  if (dimensions.width > width + 1) {
    throw new Error("Unexpected horizontal overflow in capture: " + dimensions.width + "px");
  }
  console.log(JSON.stringify(report, null, 2));
  await context.close();
} finally {
  await browser.close();
}
