import Contact from "../models/Contact.js";
// queries to the database with contacts

class contactDatabaseService {
  async handleErrors(promise) {
    try {
      const result = await promise;

      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  //contact creation
  async addContactToDatabase(fullName, number, owner) {
    return await this.handleErrors(
      new Contact({
        fullName,
        number,
        owner,
      }).save()
    );
  }
  // Find a contact by name
  async findContactInDatabase(fullName) {
    return await this.handleErrors(
      Contact.findOne({
        fullName,
      })
    );
  }
  // Find a contact by id
  async findContactInDatabaseById(_id) {
    return await this.handleErrors(
      Contact.findOne({
        _id,
      })
    );
    /*
    try {
      return await Contact.findOne({
        _id,
      });
    } catch (error) {
      return error;
    }
    */
  }
  // Contact update
  async updateContactInDatabase(fullName, number, id) {
    return await this.handleErrors(
      Contact.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            fullName,
          },
          number: number,
        }
      )
    );
  }
  // Deleting a contact
  async deleteContactOnDatabase(fullName) {
    return await this.handleErrors(
      Contact.deleteOne({
        fullName,
      })
    );
  }
  // Contact update
  async getAllContactFromDatabase() {
    return await this.handleErrors(Contact.find({}));
  }
}

export default new contactDatabaseService();
/*
 */
