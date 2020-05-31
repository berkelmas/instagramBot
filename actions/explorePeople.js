import fs from "fs";
import User from "../model/User";

export const explorePeopleFromProfile = async (username, page) => {
  await page.goto(`https://www.instagram.com/${username}`);

  await page.click(
    "section > main > div > header > section > ul > li:nth-child(2) > a"
  );
  await page.waitForSelector("body > div[role = 'presentation']");
  try {
    await page.waitForSelector(
      "body > div > div > div > ul > div > li:nth-child(1) > div > div > div",
      { timeout: 5000 }
    );
  } catch {
    await page.waitForSelector(
      "body > div > div > div > ul > div > li:nth-child(1) > div > div > div",
      { timeoit: 5000 }
    );
  }

  // AT FIRST 12 ITEMS LOADED.
  for (let i = 1; i < 300; i = i + 12) {
    await page.evaluate((selector) => {
      const scrollableSection = document.querySelector(selector);
      scrollableSection.scrollTop = scrollableSection.scrollHeight;
    }, "body > div[role='presentation'] > div:nth-child(1) > div:nth-child(2)");
    await page.waitFor(5000);
    try {
      await page.waitForSelector(
        `body > div > div > div > ul > div > li:nth-child(${i + 12})`,
        { timeout: 5000 }
      );
    } catch {
      try {
        await page.evaluate((selector) => {
          const scrollableSection = document.querySelector(selector);
          scrollableSection.scrollTop = scrollableSection.scrollHeight;
        }, "body > div[role='presentation'] > div:nth-child(1) > div:nth-child(2)");
        await page.waitForSelector(
          `body > div > div > div > ul > div > li:nth-child(${i + 12})`,
          { timeout: 5000 }
        );
      } catch {
        await page.waitFor(15000);
        await page.reload({ waitUntil: ["networkidle2", "domcontentloaded"] });
        await page.waitFor(4000);
        explorePeopleFromProfile(username, page);
      }
    }
  }
  for (let i = 1; i < 300; i++) {
    const text = await page.evaluate((selector) => {
      const el = document.querySelector(selector);
      return el.textContent;
    }, `body > div > div > div > ul > div > li:nth-child(${i}) > div > div > div:nth-child(2) > div > a`);
    const foundUser = await User.find({ username: text });
    if (!foundUser.length) {
      const newUser = new User({
        username: text,
      });
      await newUser.save();
    }
    // fs.appendFileSync("usernames.txt", `${text}\n`);
  }
};
