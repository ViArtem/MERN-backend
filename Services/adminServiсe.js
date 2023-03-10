import { adminGetAllHistory } from "../adapters/adminAdapter.js";

class adminService {
  async getHistory() {
    try {
      return await adminGetAllHistory();
    } catch (error) {
      return error;
    }
  }
}

export default new adminService();
