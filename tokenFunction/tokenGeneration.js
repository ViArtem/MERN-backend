import jwt from "jsonwebtoken";

class toketGeneration {
  //
  async accessToken(id, username, role) {
    try {
      const payload = {
        id,
        username,
        role,
      };

      return jwt.sign(payload, process.env.ACCESS_KEY, { expiresIn: "30s" });
    } catch (error) {
      return { accsessTokenValidate: error };
    }
  }
  //
  async refreshToken(id, username) {
    try {
      const payload = {
        id,
        username,
      };
      return jwt.sign(payload, process.env.REFRESH_KEY, { expiresIn: "3d" });
    } catch (error) {
      return { refreshTokenValidate: error };
    }
  }
  //
  async refreshAfterUpdatingAccessToken(id, username, exp, iat) {
    try {
      const payload = {
        id,
        username,
      };

      return jwt.sign(payload, process.env.REFRESH_KEY, {
        expiresIn: `${exp - iat - 900}s`,
      });
    } catch (error) {
      return { refreshTokenValidate: error };
    }
  }
}
export default new toketGeneration();
