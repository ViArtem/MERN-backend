//A function that adds a new user
import { addUserToDatabase } from "../contactDatabaseFunc/addContactToDatabaseGeneral.js";

//Аrray with first and last name
import { splitFullName } from "../otherFunc/string.js";

//Adding a user to the database
async function addUserToDatabaseSocket(userData) {
  try {
    //Phone number validation
    const regularExpretionNumber =
      /^(?:\+[1-9]{1,3})?(?:[0-9]{3}[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|044[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|044[0-9]{7})$/; ///^[\+][1-9]{1,4}\d{10,11}/
    const numberUser = userData.number;
    const validateUserNumber = numberUser.match(regularExpretionNumber);

    //Name validation
    const regularExpretionName = /^[a-z]+ [a-z]+$/gi;
    const fullNameBody = userData.fullName;

    const userFullNameForVerification = splitFullName(fullNameBody)
      .join(" ")
      .match(regularExpretionName);

    //Сhecking if the data is valid, if so the user is added
    if (validateUserNumber != null && userFullNameForVerification != null) {
      const addSocketFirstName = splitFullName(fullNameBody)[0];
      const addSocketLastName = splitFullName(fullNameBody)[1];

      if (addSocketLastName == "undefined") {
        return "Enter last name";
      } else {
        return await addUserToDatabase(
          addSocketFirstName,
          addSocketLastName,
          numberUser,
          userData.ownerId
        );
      }
    } else {
      return "Validate Error";
    }
  } catch (error) {
    console.log("Wrong number", error);
    return { ServerError: error };
  }
}

export { addUserToDatabaseSocket };
