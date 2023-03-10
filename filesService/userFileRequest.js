import * as fs from "node:fs/promises";
import * as fsSync from "node:fs";
import path from "node:path";
import uniqid from "uniqid";
class userFileRequest {
  async registrationUser(
    firstName,
    lastName,
    email,
    password,
    refresh,
    customId
  ) {
    const newUser = JSON.stringify(
      {
        _id: uniqid(),
        email,
        firstName,
        lastName,
        password,
        role: "user",
        refresh,
        customId,
      },
      null,
      2
    );
    await fs.writeFile(path.resolve("files", "users", `${email}.txt`), newUser);
    return newUser;
  }

  async findUser(email) {
    if (!fsSync.existsSync(path.resolve("files", "users", `${email}.txt`))) {
      return null;
    }

    return JSON.parse(
      await fs.readFile(path.resolve("files", "users", `${email}.txt`))
    );
  }

  async findUserById(id) {
    const allUsers = await fs.readdir(path.resolve("files", "users"));
    for (const files of allUsers) {
      const foundFile = await fs.readFile(
        path.resolve("files", "contacts", `${files}`)
      );
      if (JSON.parse(foundFile).customId == id) {
        return JSON.parse(foundFile);
      }
    }
  }

  async addRefreshToken(id, refresh) {
    const allUsers = await fs.readdir(path.resolve("files", "users"));
    for (const files of allUsers) {
      const updFile = await fs.readFile(
        path.resolve("files", "users", `${files}`)
      );
      if (JSON.parse(updFile).customId == id) {
        const newRefresh = JSON.parse(updFile);
        newRefresh.refresh = refresh;

        return await fs.writeFile(
          path.resolve("files", "users", `${files}`),
          JSON.stringify(newRefresh, null, 2)
        );
      }
    }
  }
}
export default new userFileRequest();
