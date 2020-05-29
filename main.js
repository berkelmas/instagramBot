import "@babel/polyfill";
import puppeteer from "puppeteer";
const dotenv = require("dotenv");
dotenv.config();

const openBrowser = async () => {
  const browser = await puppeteer.launch({
    executablePath:
      "/Users/berkelmas/nodeProjects/instagramBot/node_modules/puppeteer/.local-chromium/mac-756035/chrome-mac/Chromium.app/Contents/MacOS/Chromium",
  });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1600,
    height: 770,
    deviceScaleFactor: 1,
  });
  await page.goto("https://www.instagram.com", { waitUntil: "networkidle2" });
  await page.focus(
    "div:nth-child(2) > div:nth-child(1) > label:nth-child(1) > input:nth-child(2)"
  );
  await page.keyboard.type(process.env.INSTA_USERNAME);
  await page.focus(
    "div:nth-child(3) > div:nth-child(1) > label:nth-child(1) > input:nth-child(2)"
  );
  await page.keyboard.type(process.env.INSTA_PASSWORD);
  await page.click("button[type='submit']");
  await page.waitForNavigation({ waitUntil: "networkidle2" });
  await page.click("button:nth-child(1)");
  await page.waitForNavigation({ waitUntil: "networkidle2" });

  await page.screenshot({ path: "example.png" });

  await browser.close();
};

openBrowser();
