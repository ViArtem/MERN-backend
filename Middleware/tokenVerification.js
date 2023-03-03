import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";
import userDatabaseService from "../Database/userDatabaseService.js";
import tokenGeneration from "../tokenFunction/tokenGeneration.js";

async function checkToken(req, res, next) {
  try {
    if (req.method === "OPTIONS") {
      next();
    }
    // checking for the presence of a token
    if (req.headers.authorization == undefined) {
      return res.redirect("/user/registration");
    }

    // access token verification
    const accessToken = req.headers.authorization.split(" ")[1];
    jwt.verify(accessToken, process.env.ACCESS_KEY);

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      try {
        const refreshData = jwt.verify(
          req.headers.refresh,
          process.env.REFRESH_KEY
        );

        const refreshFromDatabase = await userDatabaseService.findUserById(
          refreshData.id
        );
        const correctRefresh = req.headers.refresh;
        console.log(refreshFromDatabase.refresh);
        console.log(refreshFromDatabase.refresh == correctRefresh);
        console.log(correctRefresh);
        const accessData = jwt_decode(req.headers.authorization.split(" ")[1]);

        if (refreshData) {
          //&& correctRefresh == validRefresh
          const newAccess = await tokenGeneration.accessToken(
            accessData.id,
            accessData.username,
            accessData.role
          );
          const newRefresh =
            await tokenGeneration.refreshAfterUpdatingAccessToken(
              accessData.id,
              accessData.username,
              refreshData.exp,
              refreshData.iat
            );

          await userDatabaseService.databaseAddRefreshToken(
            refreshData.id,
            newRefresh
          );
          console.log(newRefresh);

          return res.json({
            validateToken: "Token was successfully validated",
            access: newAccess,
            refresh: newRefresh,
          });
        }
        next();
      } catch (error) {
        res.status(401).json({ success: "Unauthorized" });
        console.log(error);
        next();
      }
    }
    console.log(error);
    next();
  }
}
export { checkToken };
