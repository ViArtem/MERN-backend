import { Router } from "express";
const routerAuth = Router();

import { findsRegistUser } from "../usersDatabaseFunction/functionToFindRegisteredUsers.js";

import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const bcrypt = require("bcryptjs");

//access function
import { genAccsessToken } from "../tokenFunction/generationAccsesToken.js";

// refresh function
import { genRefreshToken } from "../tokenFunction/generationRefreshToken.js";

import { addRefreshTokenToDatabase } from "../usersDatabaseFunction/addRefToDatabase.js";

let userAccessToken = undefined;

routerAuth.post("/auth", async (req, res) => {
  try {
    const userEmailAuthorization = req.body.email.trim();
    const userPasswordAuthorization = req.body.password.trim();
    // Сheck if the user is registered
    const checkingUserRegistered = await findsRegistUser(
      userEmailAuthorization
    );

    if (!checkingUserRegistered) {
      return res.status(401).json({
        success: `Incorrect email or password`,
        email: false,
      });
    }
    // Compare passwords
    const validUserPassword = bcrypt.compareSync(
      userPasswordAuthorization,
      checkingUserRegistered.password
    );

    if (!validUserPassword) {
      return res.status(401).json({
        success: `Incorrect email or password`,
        password: false,
      });
    }
    // generation of access token
    userAccessToken = genAccsessToken(
      checkingUserRegistered.customId,
      `${checkingUserRegistered.firstName} ${checkingUserRegistered.lastName}`,
      checkingUserRegistered.role
    );
    // generation of Refresh token
    const userRefreshToken = genRefreshToken(
      checkingUserRegistered.customId,
      `${checkingUserRegistered.firstName} ${checkingUserRegistered.lastName}`
    );

    await addRefreshTokenToDatabase(
      checkingUserRegistered.id,
      userRefreshToken
    );

    res.cookie("token", userAccessToken, {
      httpOnly: true,
      maxAge: 259200000,
    });

    return res.status(200).json({
      success: `User is authorized`,
      registered: true,
      data: userAccessToken,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: `Registration error ${e}` });
  }
});

export { routerAuth, userAccessToken };
