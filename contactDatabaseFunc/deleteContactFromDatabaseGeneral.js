import Person from "../models/Contact.js";

//Deletes the user from the database
async function delleteUserFromDatabaseFunction(
  userName,
  userLastname,
  userId,
  role
) {
  try {
    const candidate = await Person.findOne({
      name: { firstName: userName, lastName: userLastname },
    });

    if (candidate.owner == userId || role == "admin") {
      await Person.deleteOne({
        name: { firstName: userName, lastName: userLastname },
      });
      return { firstName: userName, lastName: userLastname };
    } else return "Delete error";
  } catch (error) {
    console.log(error);
    return JSON.stringify({ deleteDatabaseError: error });
  }
}

export { delleteUserFromDatabaseFunction };
