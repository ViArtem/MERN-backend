import Users from "../Models/Users.js";
// database queries with users
class userDatabaseService {
  async findUser(email) {
    try {
      return await Users.findOne({ email });
    } catch (error) {
      return error;
    }
  }
  async findUserById(customId) {
    try {
      return await Users.findOne({ customId });
    } catch (error) {
      return error;
    }
  }
  async databaseRegistrationUser(
    firstName,
    lastName,
    email,
    password,
    refresh,
    customId
  ) {
    try {
      return await new Users({
        email,
        firstName,
        lastName,
        password,
        refresh,
        customId,
      }).save();
    } catch (error) {
      return error;
    }
  }
  async databaseAddRefreshToken(id, refreshToken) {
    try {
      return await Users.updateOne(
        { customId: id },
        {
          $set: {
            refresh: refreshToken,
          },
        }
      );
    } catch (error) {
      return error;
    }
  }
}

export default new userDatabaseService();
