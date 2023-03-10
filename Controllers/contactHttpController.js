import contactHttpService from "../services/contactService.js";
import Helpers from "../exсeptions/Helpers.js";
import ApiError from "../exсeptions/apiError.js";
class contactHttpController {
  // controller to receive data to create a new contact
  async addContact(req, res, next) {
    try {
      const contactName = req.body.fullName.trim();
      const contactNumber = req.body.number.trim();
      const contactOwner = req.body.owner;

      // number and name validation
      if (contactName == "" || contactNumber == "") {
        throw ApiError.BadRequest("The value cannot be empty");
      }
      if (Helpers.dataValidation(contactName, contactNumber)) {
        throw ApiError.BadRequest(
          Helpers.dataValidation(contactName, contactNumber).success
        );
      }

      //request to create a contact
      const newContact = await contactHttpService.addNewContact(
        Helpers.allFirstLettersCapitalized(contactName),
        contactNumber,
        contactOwner
      );

      if (newContact.success == "Such a contact already exists") {
        throw ApiError.BadRequest(newContact.success);
      }

      return res.status(200).json(newContact);
    } catch (error) {
      next(error);
    }
  }
  // controller for receiving data to find a contact
  async findContact(req, res, next) {
    try {
      const fullName = req.body.fullName.trim();
      if (fullName == "") {
        throw ApiError.BadRequest("The value cannot be empty");
      }

      // request to find a contact
      const foundContact = await contactHttpService.findContact(
        Helpers.allFirstLettersCapitalized(fullName)
      );

      if (foundContact == null) {
        throw ApiError.BadRequest("Contact no found");
      }
      return res.status(200).json(foundContact);
    } catch (error) {
      next(error);
    }
  }
  // controller to receive data to delete a contact
  async deleteContact(req, res, next) {
    try {
      const { fullName, userId, userRole } = req.body;

      // request to delete a contact
      const deleteSuccess = await contactHttpService.deleteContact(
        fullName,
        userId,
        userRole
      );

      if (
        deleteSuccess.success == "You don't have enough rights" ||
        deleteSuccess.noFound
      ) {
        throw ApiError.RefreshError(deleteSuccess.success);
      }
      return res.status(200).json(deleteSuccess);
    } catch (error) {
      next(error);
    }
  }
  // controller to receive data to update the contact
  async updateContact(req, res, next) {
    try {
      const { fullName, number, id, owner, userRole } = req.body;

      if (fullName == "" || number == "") {
        throw ApiError.BadRequest("The value cannot be empty");
      }

      if (Helpers.dataValidation(fullName, number)) {
        throw ApiError.BadRequest(Helpers.dataValidation(fullName, number));
      }

      // request to update a contact
      const updatedUser = await contactHttpService.updateContact(
        Helpers.allFirstLettersCapitalized(fullName.trim()),
        number.trim(),
        id,
        owner,
        userRole
      );

      return res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
  // data retrieval controller to find all available contacts
  async findAllContact(req, res, next) {
    try {
      return res.status(200).json(await contactHttpService.getAllContact()); //;
    } catch (error) {
      next(error);
    }
  }
}

export default new contactHttpController();
