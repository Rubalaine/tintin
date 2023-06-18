import { TODAY } from "../constant/any-constant";
import { IResult } from "../types/result";

export const transformResultsToEmailBody = (results: IResult[]) => {
    let body = `<h1>Job Search Results for ${TODAY}</h1>`;
    results.forEach((result) => {
      body += `<p><a href="${result.url}">${result.url}</a> - ${result.keywords}</p>`;
    });
    return body;
  };