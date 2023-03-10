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
      // creates a new file with user data
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
      // check if there is a file with this name
      if (
        !fsSync.existsSync(path.resolve("files", "contacts", `${fullName}.txt`))
      ) {
        return null;
      }
      // read a file and return data from it
      return JSON.parse(
        await fs.readFile(path.resolve("files", "contacts", `${fullName}.txt`))
      );
    } catch (error) {
      return error;
    }
  }

  async getAllContact() {
    try {
      // get a list of all files in the folder
      const allContactFile = await fs.readdir(
        path.resolve("files", "contacts")
      );
      // reads each file converts the data to json and adds to the array
      const allContactData = [];
      for (const files of allContactFile) {
        const contactData = await fs.readFile(
          path.resolve("files", "contacts", `${files}`)
        );
        allContactData.push(JSON.parse(contactData));
      }
      return allContactData;
    } catch (error) {
      return error;
    }
  }

  async deleteContact(fullName) {
    return await fs.rm(path.resolve("files", "contacts", `${fullName}.txt`));
  }
  //
  async findByID(id) {
    try {
      // get a list of all files in the folder
      const allContact = await fs.readdir(path.resolve("files", "contacts"));
      // reads each file if id matches returns data from the file in json format
      for (const files of allContact) {
        const updFile = await fs.readFile(
          path.resolve("files", "contacts", `${files}`)
        );
        if (JSON.parse(updFile)._id == id) {
          return JSON.parse(updFile);
        }
      }
    } catch (error) {
      return error;
    }
  }
  //
  async updateContact(fullName, number, id) {
    try {
      // get a list of all files in the folder
      const allContact = await fs.readdir(path.resolve("files", "contacts"));
      // reads each file if id matches overwrites the file
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
    } catch (error) {
      return error;
    }
  }
}
export default new contactFileRequest();
