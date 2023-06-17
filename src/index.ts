import { AxiosError } from "axios";
import scrape from "./services/scrape-service";
import search from "./services/search-service";
import { sendEmail } from "./services/email-service";
import { readFromFile, writeToFile } from "./services/file-service";
import cron from "node-cron";

const TODAY = new Date().toISOString().split("T")[0];
const urls = [
  "https://emprego.co.mz",
  "https://recrutement.actioncontrelafaim.org/en/",
  "https://matolahiring.blogspot.com/",
  "https://m.reliefweb.int/jobs?search=country.exact%3A%22Mozambique%22",
  "https://emprego.mmo.co.mz/",
  "https://www.mzemprego.com/",
];

const keywords = [
  "software",
  "developer",
  "programmer",
  "programador",
  "desenvolvedor",
  "tecnologia",
];
const results: { url: string; keywords: string }[] = [];

// schedule a task for every day at 4pm
cron.schedule("0 17 * * *", async () => {
  urls.forEach((url) => {
    scrape(url).then(async(res)=> {
      const _keywords = search(res.website, keywords);
      if (_keywords.length > 0){
        results.push({ url: res.url, keywords: _keywords.join(", ") });
        await writeToFile(`${TODAY}.json`, JSON.stringify(results, null, 2));
      }
    });
  });
});

// schedule a task for every day at 5pm
cron.schedule("0 19 * * *", async () => {
  readFromFile(`${TODAY}.json`).then(async(data) => {
    if(data){
      const _results = JSON.parse(data);
      const body = transformResultsToEmailBody(_results);
      await sendEmail('kelvenrubalaine@outlook.com', `Results for ${TODAY}`, body)
    }
  });
});

const transformResultsToEmailBody = (results: { url: string; keywords: string }[]) => {
  let body = `<h1>Job Search Results for ${TODAY}</h1>`;
  results.forEach((result) => {
    body += `<p><a href="${result.url}">${result.url}</a> - ${result.keywords}</p>`;
  });
  return body;
};


// console.log(process.env);

