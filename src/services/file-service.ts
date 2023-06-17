import { readFile, writeFile } from "fs/promises";
const FILES_FOLDER = "files";
export async function writeToFile(fileName: string, data: string) {
    try {
      await writeFile(`${FILES_FOLDER}/${fileName}`, data);
      console.log(`Wrote data to ${fileName}`);
    } catch (error: any) {
      console.error(`Got an error trying to write the file: ${error.message}`);
    }
  }

export async function readFromFile(fileName: string) {
    try {
      const data = await readFile(`${FILES_FOLDER}/${fileName}`, "utf8");
      console.log(`Read data from ${fileName}`);
      return data;
    } catch (error: any) {
      console.error(`Got an error trying to read the file: ${error.message}`);
    }
}