import contactDatabaseService from "../Database/contactDatabaseService.js";

class contactHttpService {
  async addNewContact(name, number, owner) {
    try {
      // checking the contact for uniqueness
      const candidate = await contactDatabaseService.findContactInDatabase(
        name
      );
      if (candidate) {
        return { success: "Such a contact already exists" };
      }
      return await contactDatabaseService.addContactToDatabase(
        name,
        number,
        owner
      );
    } catch (error) {
      return error;
    }
  }
  //
  async findContact(name) {
    try {
      return await contactDatabaseService.findContactInDatabase(name);
    } catch (error) {
      return error;
    }
  }
  //
  async updateContact(name, number, id, owner, userRole) {
    try {
      const validateRights =
        await contactDatabaseService.findContactInDatabaseById(id);

      if (validateRights.owner == owner || userRole == "admin") {
        return await contactDatabaseService.updateContactInDatabase(
          name,
          number,
          id
        );
      } else {
        return { success: "You don't have enough rights" };
      }
    } catch (error) {
      return error;
    }
  }
  //
  async deleteContact(name, userId, userRole) {
    try {
      //перевірка на наявність користувача в базі
      if (!(await contactDatabaseService.findContactInDatabase(name))) {
        return { noFound: `Contact with name ${name} does not exist` };
      }
      //перевірка чи може користувач видалити контакт
      const validationDeletion =
        await contactDatabaseService.findContactInDatabase(name);
      if (validationDeletion.owner == userId || userRole == "admin") {
        await contactDatabaseService.deleteContactOnDatabase(name);
        return { success: `Contact ${name} has been deleted` };
      } else {
        return { success: "You don't have enough rights" };
      }
    } catch (error) {
      return error;
    }
  }
  //
  async getAllContact() {
    try {
      return await contactDatabaseService.getAllContactFromDatabase();
    } catch (error) {
      return error;
    }
  }
}

export default new contactHttpService();
