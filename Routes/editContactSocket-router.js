import { editUserSocket } from "../contactDatabaseFunc/editContactInDatabaseFuncSocket.js";
import { splitFullName } from "../otherFunc/string.js";

async function updateUser(name, number, id, ownerId, role) {
  try {
    //New number validation
    const regularExpretionNumber =
      /^(?:\+[1-9]{1,3})?(?:[0-9]{3}[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|044[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|044[0-9]{7})$/; ///^[\+][1-9]{1,4}\d{10,11}/
    let numberUser = number;
    let validateNewUserNumber = numberUser.match(regularExpretionNumber);

    //New name validation
    const regularExpretionName = /^[a-z]+ [a-z]+$/gi;
    let userFullNameForVerification = splitFullName(name)
      .join(" ")
      .match(regularExpretionName);
    if (validateNewUserNumber != null && userFullNameForVerification != null) {
      const newUserFirstName = splitFullName(name)[0];
      const newUserLastName = splitFullName(name)[1];
      const newUserNum = number;

      if (newUserLastName == "undefined" || newUserFirstName == "undefined") {
        return "Enter full name";
      } else {
        let updateUser = await editUserSocket(
          newUserFirstName,
          newUserLastName,
          id,
          newUserNum,
          ownerId,
          role
        );
        if (updateUser != "Update error") {
          return updateUser;
        } else return "Update error";
      }
    } else {
      return "Full name or number don't valid";
    }
  } catch (error) {
    console.log(`Updating error: ${error}`);
    return JSON.stringify({ ErrorMessage: error });
  }
}

export { updateUser };
