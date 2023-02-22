import Person from "../models/Contact.js";
import { largeFirstLiters } from "../otherFunc/AllLargeLieter.js";
//Аdds a user to the database
async function addUserToDatabase(firstName, lastName, number, owner) {
  try {
    const newUser = await new Person({
      name: {
        firstName: largeFirstLiters(firstName),
        lastName: largeFirstLiters(lastName),
      },
      number,
      owner,
    });
    await newUser.save();
    return newUser;
  } catch (e) {
    console.log(e);
    return e;
  }
}

export { addUserToDatabase };
