import Contact from "../Models/Contact.js";
// queries to the database with contacts
class contactDatabaseService {
  //contact creation
  async addContactToDatabase(fullName, number, owner) {
    try {
      return await new Contact({
        fullName,
        number,
        owner,
      }).save();
    } catch (error) {
      return error;
    }
  }
  // Find a contact by name
  async findContactInDatabase(fullName) {
    try {
      return await Contact.findOne({
        fullName,
      });
    } catch (error) {
      return error;
    }
  }
  // Find a contact by id
  async findContactInDatabaseById(_id) {
    try {
      return await Contact.findOne({
        _id,
      });
    } catch (error) {
      return error;
    }
  }
  // contact update
  async updateContactInDatabase(fullName, number, id) {
    try {
      return await Contact.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            fullName,
          },
          number: number,
        }
      );
    } catch (error) {
      return error;
    }
  }
  //deleting a contact
  async deleteContactOnDatabase(fullName) {
    try {
      return await Contact.deleteOne({
        fullName,
      });
    } catch (error) {
      return error;
    }
  }
  //contact update
  async getAllContactFromDatabase() {
    try {
      return await Contact.find({});
    } catch (error) {
      return error;
    }
  }
}

export default new contactDatabaseService();
