import "@babel/polyfill";
import { db } from "./credentials/mongodb-connect";
import { openBrowser } from "./actions/openBrowser";
import { loginInstagram } from "./actions/loginAction";
import { getProfileData } from "./actions/getProfileData";
import { explorePeopleFromProfile } from "./actions/explorePeople";
const dotenv = require("dotenv");
dotenv.config();

const instaAccounts = [
  "cmylmz",
  "cezmikalorifer",
  "hadise",
  "ekremimamoglu",
  "drfahrettinkoca",
  "acunilicali",
  "yavasmansur",
  "rterdogan",
  "ziyaselcukprofdr",
  "ilberortayli",
  "aslienver",
  "prof.dr.osmanmuftuoglu",
  "kenansofuoglu",
  "fatihportakal35",
  "seymasubasi",
  "kivanctatlitug",
  "muratboz",
  "ezomola",
  "bensusoral",
  "sahangokbakar",
  "iynemliarasbulut",
  "hazalkaya",
  "burakozcivit",
  "evcenf",
  "beyazitozturk26",
];

db.once("open", () => {
  console.log("DENEME 3");
  const main = async () => {
    const { page, browser } = await openBrowser();
    await loginInstagram(page);

    for (let i = 0; i < 100; i++) {
      const selectedProfile =
        instaAccounts[Math.round(Math.random() * instaAccounts.length - 1)];
      await page.waitFor(5000);
      await explorePeopleFromProfile(selectedProfile, page);
      await page.waitFor(4000);
      await page.reload({ waitUntil: ["networkidle2", "domcontentloaded"] });
      await page.waitFor(4000);
    }
    // await page.screenshot({ path: "./images/example.png" });

    await browser.close();
  };

  main();
});
