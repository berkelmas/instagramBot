import scrollPageToBottom from "puppeteer-autoscroll-down";
import { download } from "../utility/downloadPhoto";

export const getProfileData = async (username, page) => {
  const userInfo = {};
  await page.goto(`https://www.instagram.com/${username}`);
  const info = await page.$$eval(
    "section > main > div > header > section > ul > li > a > span",
    (inf) => inf.map((i) => i.innerText)
  );
  userInfo["follower"] = info[0];
  userInfo["following"] = info[1];
  await scrollPageToBottom(page);
  page.waitFor(1000);
  await scrollPageToBottom(page);
  page.waitFor(1000);

  const images = await page.$$eval(
    "article > div > div > div > div > a > div > div > img",
    (imgs) =>
      imgs.map((img) => ({
        link: img.getAttribute("src"),
        alt: img.getAttribute("alt"),
      }))
  );
  userInfo["images"] = images;

  for (let i = 0; i < images.length; i++) {
    await download(images[i]["link"], `./images/${i}.png`);
  }
};
