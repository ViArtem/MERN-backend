import adminDatabaseService from "../Database/adminDatabaseService.js";
class adminService {
  async getHistory() {
    try {
      return await adminDatabaseService.getHistory();
    } catch (error) {
      return error;
    }
  }
}

export default new adminService();
