import { createRequire } from "node:module";
import { validateRefreshToken } from "../tokenFunction/validateRefreshToken.js";
import { findsRegisterdUserById } from "../usersDatabaseFunction/functionToFindRegisteredUsers.js";
const require = createRequire(import.meta.url);
let jwt = require("jsonwebtoken");

const key = process.env.KEY;

let decodedData;
async function checkRegist(req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    // if there are no cookies, we transfer to authorization

    if (req.headers.authorization == undefined) {
      return res.status(401).redirect("/regist");
      //.send(JSON.stringify("User is not authorized"));
    }
    // if there are cookies, we first get the access token
    const token = req.headers.authorization.split(" ")[1];

    //verify the token
    decodedData = jwt.verify(token, key);

    // checking if the user with the name extracted from the token is in the database
    let checkingForUserAvailability = await findsRegisterdUserById(
      decodedData.id
    );
    if (!checkingForUserAvailability) {
      res.removeHeader("authorization");
      return res.status(401).send(JSON.stringify("User is not registered"));
    }

    if (checkingForUserAvailability.refresh == "I registered") {
      res.removeHeader("authorization");
      return res.json({ refresh: "No valid" });

      //return res.redirect("/auth");
    }

    req.user = decodedData;
    next();
  } catch (e) {
    //

    if (e instanceof jwt.TokenExpiredError) {
      // look for a user by id, look at his refresh, validate him, if he is valid, issue a new access
      let newToken = await validateRefreshToken(
        req.headers.authorization.split(" ")[1]
      );

      if (newToken.message == "EXPIRED REFRESH TOKEN") {
        return res.status(401).send(JSON.stringify("EXPIRED REFRESH TOKEN"));
      }

      if (newToken.message == "Refresh no valid") {
        return res.status(401).send(JSON.stringify("Please regist"));
      }

      if (newToken.message === "User not foud") {
        return res.status(404).send(JSON.stringify("User not foud"));
      }

      if (newToken.message === "Server error") {
        return res.status(500).send(JSON.stringify("Server error"));
      }
      if (newToken.message === "No refresh") {
        return res.status(404).send(JSON.stringify("No refresh"));
      }
      //res.removeHeader("authorization");
      res.cookie("token", newToken, {
        httpOnly: true,
        maxAge: 259200000,
      });
      return res.status(200).json({
        validateToken: "Token was successfully validated",
        token: newToken,
      });
    }
    console.log("Server error during token validation " + e);
    res.status(e.status).json({
      customErorMessade: "Server error during token validation",
      errorMessage: e.message,
    });
    next();
  }
}

export { checkRegist, decodedData };
