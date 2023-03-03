import userDatabaseService from "../Database/userDatabaseService.js";
import tokenGeneration from "../tokenFunction/tokenGeneration.js";
import bcrypt from "bcrypt";
import uniqid from "uniqid";

class userService {
  async registrationUser(firstName, lastName, email, password) {
    try {
      // check if such a user is registered
      const candidate = await userDatabaseService.findUser(email);

      if (candidate) {
        return { success: `User already exists` };
      }

      // password hashing and id generation
      const hashPassword = bcrypt.hashSync(password, 7);
      const customId = uniqid();

      // refresh token generation
      const userRefreshToken = await tokenGeneration.refreshToken(
        customId,
        `${firstName} ${lastName}`
      );

      // user registration
      const newUser = await userDatabaseService.databaseRegistrationUser(
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
  async authenticationUser(password, email) {
    try {
      const checkingUserRegistered = await userDatabaseService.findUser(email);

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

      await userDatabaseService.databaseAddRefreshToken(
        checkingUserRegistered.id,
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
}

export default new userService();
