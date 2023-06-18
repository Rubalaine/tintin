import dotenv  from 'dotenv';
import scrape from "./services/scrape-service";
import search from "./services/search-service";
import { sendEmail } from "./services/email-service";
import cron from "node-cron";
import {
  getKeywords,
  getTodayResults,
  getUrls,
  saveResult,
} from "./services/cloud-storage-service";
import { TODAY } from "./constant/any-constant";
import { transformResultsToEmailBody } from "./helpers/results-to-email-body";

dotenv.config();


cron.schedule("0 17 * * *", async () => {
  try {
    const keywords = await getKeywords();
    const urls = await getUrls();
    if (keywords.length && urls.length) {
      urls.forEach((url) => {
        scrape(url)
          .then(async (res) => {
            const _keywords = search(res.website, keywords);
            if (_keywords.length > 0) {
              await saveResult({
                url: res.url,
                keywords: _keywords.join(", "),
              });
            }
          })
          .catch((error) => {
            console.error(`[${new Date()}] Error while scrapping `, error);
          });
      });
    }
  } catch (error) {
    console.error(
      `[${new Date()}] Error while loading keywords and urls`,
      error
    );
  }
});

cron.schedule("0 19 * * *", async () => {
  try {
    const results = await getTodayResults();
    if (results.length) {
      const body = transformResultsToEmailBody(results);
      await sendEmail(
        `${process.env.EMAIL_RECEIVER}`,
        `Results for ${TODAY}`,
        body
      );
    }
  } catch (error) {
    console.error(`[${new Date()}] Error while sending emails`, error);
  }
});

console.log(`[${new Date}] service up`);
