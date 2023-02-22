//генерація refresh токена
import dotev from "dotenv";
dotev.config();
const refreshKey = process.env.REFRESH_KEY;
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
let jwt = require("jsonwebtoken");

function genRefreshToken(id, username) {
  const payload = {
    id,
    username,
  };
  return jwt.sign(payload, refreshKey, { expiresIn: "3d" });
}

function generationRefreshTokenAfterUpdatingAccess(id, username, iat, exp) {
  const payload = {
    id: id,
    username: username,
  };

  return jwt.sign(payload, refreshKey, {
    expiresIn: `${exp - iat - 900}s`, //`${(exp - Date.now() / 1000) / 3600 / 24}h`,
  });
}

export { genRefreshToken, generationRefreshTokenAfterUpdatingAccess };
