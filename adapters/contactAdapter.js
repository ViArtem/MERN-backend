import contactDatabaseService from "../database/contactDatabaseService.js";
import contactFileRequest from "../filesService/contactFileRequest.js";

class contactAdapter {
  async addContact(name, number, owner) {
    if (process.env.QUERY_PARAMETERS == "mongo") {
      return await contactDatabaseService.addContactToDatabase(
        name,
        number,
        owner
      );
    } else {
      return await contactFileRequest.addContact(name, number, owner);
    }
  }
  async findContact(fullName) {
    if (process.env.QUERY_PARAMETERS == "mongo") {
      return await contactDatabaseService.findContactInDatabase(fullName);
    } else {
      return await contactFileRequest.findContact(fullName);
    }
  }

  async getAllContact() {
    if (process.env.QUERY_PARAMETERS == "mongo") {
      return await contactDatabaseService.getAllContactFromDatabase();
    } else {
      return await contactFileRequest.getAllContact();
    }
  }
  async deleteContact(name) {
    if (process.env.QUERY_PARAMETERS == "mongo") {
      return await contactDatabaseService.deleteContactOnDatabase(name);
    } else {
      return await contactFileRequest.deleteContact(name);
    }
  }

  async findContactById(id) {
    if (process.env.QUERY_PARAMETERS == "mongo") {
      return await contactDatabaseService.findContactInDatabaseById(id);
    } else {
      return await contactFileRequest.findByID(id);
    }
  }

  async updateContact(name, number, id, owner, userRole) {
    if (process.env.QUERY_PARAMETERS == "mongo") {
      return await contactDatabaseService.updateContactInDatabase(
        name,
        number,
        id
      );
    } else {
      return await contactFileRequest.updateContact(name, number, id);
    }
  }
}

export default new contactAdapter();
