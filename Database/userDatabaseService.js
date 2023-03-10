import Users from "../models/Users.js";
// database queries with users
class userDatabaseService {
  async handleErrors(promise) {
    try {
      const result = await promise;

      return result;
    } catch (error) {
      return error;
    }
  }
  //
  async findUser(email) {
    return await this.handleErrors(Users.findOne({ email }));
  }
  //
  async findUserById(customId) {
    return await this.handleErrors(Users.findOne({ customId }));
  }
  //
  async databaseRegistrationUser(
    firstName,
    lastName,
    email,
    password,
    refresh,
    customId
  ) {
    return await this.handleErrors(
      new Users({
        email,
        firstName,
        lastName,
        password,
        refresh,
        customId,
      }).save()
    );
    /*
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
    */
  }
  //
  async databaseAddRefreshToken(id, refreshToken) {
    return await this.handleErrors(
      Users.updateOne(
        { customId: id },
        {
          $set: {
            refresh: refreshToken,
          },
        }
      )
    );
    /*
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
    */
  }
}

export default new userDatabaseService();
