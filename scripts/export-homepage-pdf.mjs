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
    reducedMotion: "no-preference",
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

  // Walk the existing page without changing its layout so lazy images and scroll reveals load.
  const sectionCount = await page.locator("main > section").count();
  for (let i = 0; i < sectionCount; i += 1) {
    await page.locator("main > section").nth(i).evaluate(node => {
      node.scrollIntoView({ block: "center", behavior: "instant" });
    });
    await page.waitForTimeout(220);
  }

  // Force native lazy images to load, then wait for their decoded pixels.
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

  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.waitForTimeout(650);
  await page.screenshot({
    path: screenshotPath,
    fullPage: true,
    type: "png",
    animations: "disabled",
    caret: "hide",
    timeout: 120000,
  });

  const dimensions = await page.evaluate(() => ({
    width: document.documentElement.scrollWidth,
    height: Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight,
    ),
    title: document.title,
  }));

  const report = {
    url: baseUrl + "/",
    title: dimensions.title,
    viewport: { width, height },
    screenshot: screenshotPath,
    screenshotCssDimensions: { width: dimensions.width, height: dimensions.height },
    sections: sectionCount,
    images: imageReport,
    pageErrors,
    consoleErrors,
  };
  await (await import("node:fs/promises")).writeFile(
    outputDir + "/capture-report.json",
    JSON.stringify(report, null, 2),
  );

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
