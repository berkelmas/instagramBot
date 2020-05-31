import "@babel/polyfill";
import { db } from "./credentials/mongodb-connect";
import { openBrowser } from "./actions/openBrowser";
import { loginInstagram } from "./actions/loginAction";
import { getProfileData } from "./actions/getProfileData";
import { explorePeopleFromProfile } from "./actions/explorePeople";
const dotenv = require("dotenv");
dotenv.config();

db.once("open", () => {
  console.log("DENEME");
  const main = async () => {
    const { page, browser } = await openBrowser();
    await loginInstagram(page);

    // await getProfileData("hadise", page);
    for (let i = 0; i < 10; i++) {
      await explorePeopleFromProfile("cezmikalorifer", page);
      await page.waitFor(4000);
      await page.reload({ waitUntil: ["networkidle2", "domcontentloaded"] });
      await page.waitFor(4000);
    }
    // await page.screenshot({ path: "./images/example.png" });

    await browser.close();
  };

  main();
});
