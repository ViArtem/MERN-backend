import { findsUser } from "../contactDatabaseFunc/findContactInDatabaseFuncGeneral.js";
import { splitFullName } from "../otherFunc/string.js";

let foundUser;
let userName;
let userLastname;

//Processes a request to find a user

async function findUserByName(userNameForFind) {
  try {
    userName = splitFullName(userNameForFind.fullName)[0];
    userLastname = splitFullName(userNameForFind.fullName)[1];
    if (userLastname == "undefined") {
      return "User not found";
    }
    // Тhe found user object
    foundUser = await findsUser(userName, userLastname);

    if (foundUser != null) {
      return foundUser;
    } else {
      return "User not found";
    }
  } catch (e) {
    console.log(e);
    return "User not found";
  }
}

export { userName, foundUser, userLastname, findUserByName };
