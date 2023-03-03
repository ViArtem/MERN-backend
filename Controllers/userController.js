import ApiError from "../Exсeptions/apiError.js";
import userService from "../Services/userService.js";
class userHttpController {
  // user registration controller
  async registrationUser(req, res, next) {
    try {
      const regularForPassword = new RegExp(
        "(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}",
        "g"
      );

      const regularForEmail = new RegExp(
        "^[a-zA-Z0-9_]+@[a-zA-Z_]+?.[a-zA-Z]{2,3}$",
        "g"
      );

      // receive data from the form
      const { firstName, lastName, email, password } = req.body;

      if (
        firstName.trim() == "" ||
        password.trim() == "" ||
        lastName.trim() == "" ||
        email.trim() == ""
      ) {
        throw ApiError.BadRequest("Fields cannot be empty");
      }

      const validateUserPassword = regularForPassword.test(password.trim());
      const validateUserEmail = regularForEmail.test(email.trim());

      if (validateUserPassword == false) {
        throw ApiError.BadRequest(
          "The password does not meet the requirements. It must contain the following characters: 'A-Z', 'a-z', '0-9', '!,@, #' and be at least 6 characters long"
        );
      }

      if (validateUserEmail == false) {
        throw ApiError.BadRequest("The email does not meet the requirements");
      }

      const registrationStatus = await userService.registrationUser(
        firstName.trim(),
        lastName.trim(),
        email.trim(),
        password.trim()
      );

      // processing of incorrect data
      if (registrationStatus.success == `User already exists`) {
        throw ApiError.BadRequest(`User already exists`);
      }

      res.status(200).json({
        success: "The user is registered",
        accessToken: registrationStatus.access,
        refreshToken: registrationStatus.refresh,
      });
    } catch (error) {
      next(error);
    }
  }
  // user authorization controller
  async authorizationUser(req, res, next) {
    try {
      const { email, password } = req.body;

      if (password.trim() == "" || email.trim() == "") {
        throw ApiError.BadRequest("Fields cannot be empty");
      }
      const authenticationResult = await userService.authenticationUser(
        password.trim(),
        email.trim()
      );
      if (authenticationResult.success == `Incorrect email or password`) {
        throw ApiError.UnauthorizedError(`Incorrect email or password`);
      }

      if (authenticationResult.success == `User is authorized`) {
        return res.status(200).json({
          success: `User is authorized`,
          registered: true,
          refresh: authenticationResult.refresh,
          data: authenticationResult.access,
        });
      }
    } catch (error) {
      next(error);
    }
  }
}

export default new userHttpController();
