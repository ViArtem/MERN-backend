import * as fs from "node:fs/promises";
import * as fsSync from "node:fs";
import path from "node:path";
import uniqid from "uniqid";
class contactFileRequest {
  async addContact(name, number, owner) {
    try {
      const newContact = JSON.stringify(
        {
          _id: uniqid(),
          fullName: name,
          number,
          owner,
        },
        null,
        2
      );
      await fs.writeFile(
        path.resolve("files", "contacts", `${name}.txt`),
        newContact
      );
      return newContact;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async findContact(fullName) {
    try {
      if (
        !fsSync.existsSync(path.resolve("files", "contacts", `${fullName}.txt`))
      ) {
        return null;
      }

      return JSON.parse(
        await fs.readFile(path.resolve("files", "contacts", `${fullName}.txt`))
      );
    } catch (error) {
      return error;
    }
  }

  async getAllContact() {
    const allContactFile = await fs.readdir(path.resolve("files", "contacts"));
    const allContactData = [];
    for (const files of allContactFile) {
      const contactData = await fs.readFile(
        path.resolve("files", "contacts", `${files}`)
      );
      allContactData.push(JSON.parse(contactData));
    }
    return allContactData;
  }

  async deleteContact(fullName) {
    return await fs.rm(path.resolve("files", "contacts", `${fullName}.txt`));
  }
  //
  async findByID(id) {
    const allContact = await fs.readdir(path.resolve("files", "contacts"));
    for (const files of allContact) {
      const updFile = await fs.readFile(
        path.resolve("files", "contacts", `${files}`)
      );
      if (JSON.parse(updFile)._id == id) {
        return JSON.parse(updFile);
      }
    }
  }
  //
  async updateContact(fullName, number, id) {
    const allContact = await fs.readdir(path.resolve("files", "contacts"));
    for (const files of allContact) {
      const updFile = await fs.readFile(
        path.resolve("files", "contacts", `${files}`)
      );
      if (JSON.parse(updFile)._id == id) {
        const newUser = JSON.parse(updFile);
        newUser.fullName = fullName;
        newUser.number = number;

        await fs.rename(
          path.resolve("files", "contacts", `${files}`),
          `${newUser.fullName}.txt`
        );
        await fs.writeFile(
          path.resolve("files", "contacts", `${newUser.fullName}.txt`),
          JSON.stringify(newUser, null, 2)
        );

        return newUser;
      }
    }
  }
}
export default new contactFileRequest();
