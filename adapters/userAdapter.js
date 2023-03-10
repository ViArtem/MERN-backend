import userDatabaseService from "../database/userDatabaseService.js";
import userFileRequest from "../filesService/userFileRequest.js";
class userAdapter {
  async registrationUser(
    firstName,
    lastName,
    email,
    hashPassword,
    userRefreshToken,
    customId
  ) {
    if (process.env.QUERY_PARAMETERS == "mongo") {
      return await userDatabaseService.databaseRegistrationUser(
        firstName,
        lastName,
        email,
        hashPassword,
        userRefreshToken,
        customId
      );
    } else {
      return await userFileRequest.registrationUser(
        firstName,
        lastName,
        email,
        hashPassword,
        userRefreshToken,
        customId
      );
    }
  }

  async findUser(email) {
    if (process.env.QUERY_PARAMETERS == "mongo") {
      return await userDatabaseService.findUser(email);
    } else {
      return await userFileRequest.findUser(email);
    }
  }

  async findUserById(id) {
    if (process.env.QUERY_PARAMETERS == "mongo") {
      return await userDatabaseService.findUserById(id);
    } else {
      return await userFileRequest.findUserById(id);
    }
  }

  async addRefreshToken(id, refresh) {
    if (process.env.QUERY_PARAMETERS == "mongo") {
      return await userDatabaseService.databaseAddRefreshToken(id, refresh);
    } else {
      return await userFileRequest.addRefreshToken(id, refresh);
    }
  }
}
export default new userAdapter();
