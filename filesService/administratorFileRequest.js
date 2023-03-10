import * as fs from "node:fs/promises";
import path from "node:path";
import uniqid from "uniqid";
class administratorFileRequest {
  async getAllHistory() {
    try {
      const allHistoryFile = await fs.readdir(
        path.resolve("files", "administratorHistory")
      );
      let allHistoryData = [];
      //
      for (const files of allHistoryFile) {
        const historyData = await fs.readFile(
          path.resolve("files", "administratorHistory", `${files}`)
        );

        allHistoryData.push(JSON.parse(historyData));
      }

      return allHistoryData;
    } catch (error) {
      return error;
    }
  }
  //
  async addNewAction(action, time) {
    try {
      const newActions = JSON.stringify(
        {
          id: uniqid(),
          action: action,
          time: Number(time),
        },
        null,
        2
      );

      return await fs.writeFile(
        path.resolve("files", "administratorHistory", `${uniqid()}.txt`),
        newActions
      );
    } catch (error) {
      return error;
    }
  }
}
export default new administratorFileRequest();
