import History from "../Models/History.js";
class adminDatabaseService {
  // request to receive the entire history for the administrator
  async getHistory() {
    try {
      return await History.find();
    } catch (error) {
      return error;
    }
  }
  // request to add history for the administrator
  async addNewAction(action, time) {
    try {
      return await new History({
        action,
        time,
      }).save();
    } catch (error) {
      return error;
    }
  }
}
export default new adminDatabaseService();
