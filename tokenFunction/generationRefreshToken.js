//генерація refresh токена
import dotev from "dotenv";
dotev.config();
const refreshKey = process.env.REFRESH_KEY;
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
let jwt = require("jsonwebtoken");

function genRefreshToken(id, username) {
  try {
    const payload = {
      id,
      username,
    };
    return jwt.sign(payload, refreshKey, { expiresIn: "3d" });
  } catch (error) {
    return JSON.stringify({ refreshTokenValidate: error });
  }
}

function generationRefreshTokenAfterUpdatingAccess(id, username, iat, exp) {
  try {
    const payload = {
      id: id,
      username: username,
    };

    return jwt.sign(payload, refreshKey, {
      expiresIn: `${exp - iat - 900}s`, //`${(exp - Date.now() / 1000) / 3600 / 24}h`,
    });
  } catch (error) {
    return JSON.stringify({ refreshTokenValidate: error });
  }
}

export { genRefreshToken, generationRefreshTokenAfterUpdatingAccess };
