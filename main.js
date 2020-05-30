import "@babel/polyfill";
import { openBrowser } from "./actions/openBrowser";
import { loginInstagram } from "./actions/loginAction";
import { getProfileData } from "./actions/getProfileData";
import { explorePeopleFromProfile } from "./actions/explorePeople";
const dotenv = require("dotenv");
dotenv.config();

const main = async () => {
  const { page, browser } = await openBrowser();
  await loginInstagram(page);

  // await getProfileData("hadise", page);
  await explorePeopleFromProfile("cezmikalorifer", page);
  // await page.screenshot({ path: "./images/example.png" });

  await browser.close();
};

main();
