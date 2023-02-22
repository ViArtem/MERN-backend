import Regist from "../models/RegisteredUsers.js";

import jwt_decode from "jwt-decode";

import { genAccsessToken } from "./generationAccsesToken.js";

import { createRequire } from "node:module";

import { generationRefreshTokenAfterUpdatingAccess } from "./generationRefreshToken.js";

const refreshKey = process.env.REFRESH_KEY;
const require = createRequire(import.meta.url);
const jwt = require("jsonwebtoken");

let validPerson;

async function validateRefreshToken(TokeNdecodedData) {
  try {
    if (TokeNdecodedData) {
      let decoded = jwt_decode(TokeNdecodedData);

      validPerson = await Regist.findOne({ customId: decoded.id });

      if (!validPerson) {
        return new Error("User not foud");
      }

      if (validPerson.refresh == "I registered") {
        return new Error("Refresh no valid");
      }

      let validRefresh = jwt.verify(validPerson.refresh, refreshKey);

      // generate new access token
      let newUserAccessToken = genAccsessToken(
        validPerson.customId,
        `${validPerson.firstName} ${validPerson.lastName}`,
        validPerson.role
      );

      //generate new refresh token
      let newRefresh = generationRefreshTokenAfterUpdatingAccess(
        validRefresh.id,
        validRefresh.username,
        validRefresh.iat,
        validRefresh.exp
      );
      await Regist.updateOne(
        { _id: validPerson._id },
        {
          $set: {
            refresh: newRefresh,
          },
        }
      );

      return newUserAccessToken;
    } else return new Error("No refresh");
  } catch (e) {
    // if there is a token error, we transfer user to authorization
    if (e instanceof jwt.TokenExpiredError) {
      await Regist.updateOne(
        { _id: validPerson._id },
        {
          $set: {
            refresh: "I registered",
          },
        }
      );
      return new Error("EXPIRED REFRESH TOKEN");
    }
    console.log(e.message);
    return new Error("Server error");
  }
}

export { validateRefreshToken };
