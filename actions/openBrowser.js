import puppeteer from "puppeteer";

export const openBrowser = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath:
      "/Users/berkelmas/nodeProjects/instagramBot/node_modules/puppeteer/.local-chromium/mac-756035/chrome-mac/Chromium.app/Contents/MacOS/Chromium",
  });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1600,
    height: 770,
    deviceScaleFactor: 1,
  });
  return { page, browser };
};
