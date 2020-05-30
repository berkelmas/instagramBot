import puppeteer from "puppeteer";
const dotenv = require("dotenv");
dotenv.config();

export const loginInstagram = async (page) => {
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
};
