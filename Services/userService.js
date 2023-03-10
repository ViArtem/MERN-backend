import userAdapter from "../adapters/userAdapter.js";
import tokenGeneration from "../tokenFunction/tokenGeneration.js";
import bcrypt from "bcrypt";
import uniqid from "uniqid";

class userService {
  async registrationUser(firstName, lastName, email, password) {
    try {
      // check if such a user is registered
      const candidate = await userAdapter.findUser(email);

      if (candidate) {
        return { success: `User already exists` };
      }

      // password hashing and id generation
      const hashPassword = await bcrypt.hashSync(password, 7);
      const customId = uniqid();

      // refresh token generation
      const userRefreshToken = await tokenGeneration.refreshToken(
        customId,
        `${firstName} ${lastName}`
      );

      // user registration
      const newUser = await userAdapter.registrationUser(
        firstName,
        lastName,
        email,
        hashPassword,
        userRefreshToken,
        customId
      );

      const accessToken = await tokenGeneration.accessToken(
        customId,
        `${firstName} ${lastName}`,
        newUser.role
      );

      return { access: accessToken, refresh: userRefreshToken };
    } catch (error) {
      return error;
    }
  }
  //
  async authenticationUser(password, email) {
    try {
      const checkingUserRegistered = await userAdapter.findUser(email);

      if (!checkingUserRegistered) {
        return { success: `Incorrect email or password` };
      }
      const validUserPassword = bcrypt.compareSync(
        password,
        checkingUserRegistered.password
      );

      if (!validUserPassword) {
        return { success: `Incorrect email or password` };
      }
      // generation of access token
      const userAccessToken = await tokenGeneration.accessToken(
        checkingUserRegistered.customId,
        `${checkingUserRegistered.firstName} ${checkingUserRegistered.lastName}`,
        checkingUserRegistered.role
      );
      // generation of Refresh token
      const userRefreshToken = await tokenGeneration.refreshToken(
        checkingUserRegistered.customId,
        `${checkingUserRegistered.firstName} ${checkingUserRegistered.lastName}`
      );
      //
      await userAdapter.addRefreshToken(
        checkingUserRegistered.customId,
        userRefreshToken
      );

      return {
        success: `User is authorized`,
        access: userAccessToken,
        refresh: userRefreshToken,
      };
    } catch (error) {
      return error;
    }
  }
  async verifyRefresh(refreshData, accessData) {
    const newAccess = await tokenGeneration.accessToken(
      accessData.id,
      accessData.username,
      accessData.role
    );
    const newRefresh = await tokenGeneration.refreshAfterUpdatingAccessToken(
      accessData.id,
      accessData.username,
      refreshData.exp,
      refreshData.iat
    );

    await userAdapter.addRefreshToken(refreshData.id, newRefresh);
    return { newAccess, newRefresh };
    //userDatabaseService.databaseAddRefreshToken(refreshData.id, newRefresh);
  }
}

export default new userService();
