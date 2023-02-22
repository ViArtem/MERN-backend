import Person from "../models/Contact.js";

import { largeFirstLiters } from "../otherFunc/AllLargeLieter.js";

//Сhanges the user in the database
async function editUserSocket(
  newUserFirstName,
  newUserLastName,
  userIdWeAreUpdating,
  newUserNum,
  ownerId,
  role
) {
  try {
    const candidate = await Person.findOne({ _id: userIdWeAreUpdating });
    if (candidate.owner == ownerId || role == "admin") {
      await Person.updateOne(
        { _id: userIdWeAreUpdating },
        {
          $set: {
            name: {
              firstName: largeFirstLiters(newUserFirstName),
              lastName: largeFirstLiters(newUserLastName),
            },
          },
          number: newUserNum,
        }
      );

      return {
        firstName: largeFirstLiters(newUserFirstName),
        lastName: largeFirstLiters(newUserLastName),
        _id: userIdWeAreUpdating,
      };
    } else return "Update error";
  } catch (e) {
    console.log(e);
    return e;
  }
}

export { editUserSocket };
