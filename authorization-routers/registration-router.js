import { Router } from "express";
const routerRegist = Router();
//user search function by login
import { findsRegistUser } from "../usersDatabaseFunction/functionToFindRegisteredUsers.js";

// new user registration
import { registNewUser } from "../usersDatabaseFunction/registrationFunction.js";

import { genRefreshToken } from "../tokenFunction/generationRefreshToken.js";

import { genAccsessToken } from "../tokenFunction/generationAccsesToken.js";

import { createRequire } from "node:module";

import uniqid from "uniqid";
const require = createRequire(import.meta.url);
const bcrypt = require("bcryptjs");

routerRegist.post("/regist", async (req, res) => {
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

    const registUserEmail = req.body.email.trim();
    const registUserFirstName = req.body.firstName.trim();
    const registUserLastName = req.body.lastName.trim();
    const registUserPassword = req.body.password.trim();

    const validateUserPassword = regularForPassword.test(registUserPassword);
    const validateUserEmail = regularForEmail.test(registUserEmail);

    if (
      registUserFirstName == "" ||
      registUserPassword == "" ||
      registUserLastName == "" ||
      registUserEmail == ""
    ) {
      return res.status(406).json({ success: "Fields cannot be empty" });
    }

    if (validateUserPassword == false) {
      return res
        .status(401)
        .json({
          success:
            "The password does not meet the requirements. It must contain the following characters: 'A-Z', 'a-z', '0-9', '!,@, #' and be at least 6 characters long",
        });
    }

    if (validateUserEmail == false) {
      return res
        .status(401)
        .json({ success: "The email does not meet the requirements" });
    }

    // check if such a user is registered
    const candidate = await findsRegistUser(registUserEmail);

    if (candidate) {
      return res
        .status(403)
        .json({ success: `User ${registUserEmail} already exists` });
    }
    // hash the password and store the user in the database
    const hashPassword = bcrypt.hashSync(registUserPassword, 7);
    const customId = uniqid();
    const userRefreshToken = genRefreshToken(
      customId,
      `${registUserFirstName} ${registUserLastName}`
    );
    const newUser = await registNewUser(
      registUserFirstName,
      registUserLastName,
      registUserEmail,
      hashPassword,
      userRefreshToken,
      customId
    );

    let userAccessToken = genAccsessToken(
      newUser.customId,
      `${newUser.firstName} ${newUser.lastName}`,
      newUser.role
    );

    res.cookie("token", userAccessToken, {
      httpOnly: true,
      maxAge: 259200000,
    });

    res
      .status(200)
      .json({ success: "The user is registered", token: userAccessToken });
  } catch (e) {
    res.status(501).json({ message: `Registration error ${e}` });
  }
});
export { routerRegist };
