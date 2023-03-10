import administratorFileRequest from "../filesService/administratorFileRequest.js";
import adminDatabaseService from "../database/adminDatabaseService.js";
class administratorAdapter {
  async getAllHistory() {
    if (process.env.QUERY_PARAMETERS == "mongo") {
      return await adminDatabaseService.getHistory();
    } else {
      return await administratorFileRequest.getAllHistory();
    }
  }
  async addAction(action, time) {
    if (process.env.QUERY_PARAMETERS == "mongo") {
      return await adminDatabaseService.addNewAction(action, time);
    } else {
      return await administratorFileRequest.addNewAction(action, time);
    }
  }
}
const adminGetAllHistory = new administratorAdapter().getAllHistory;
const adminAddAction = new administratorAdapter().addAction;
export { adminGetAllHistory, adminAddAction };
