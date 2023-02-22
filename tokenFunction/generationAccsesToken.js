//generation of access token
import dotev from "dotenv";
dotev.config();
const key = process.env.KEY;
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
let jwt = require("jsonwebtoken");
function genAccsessToken(id, username, role) {
  const payload = {
    id,
    username,
    role,
  };

  return jwt.sign(payload, key, { expiresIn: "15m" });
}

export { genAccsessToken };
