import Person from "../models/Contact.js";

//finds the user in the database
async function findsUser(userName, userLastname) {
  try {
    let findUser = await Person.findOne({
      name: {
        firstName: userName,
        lastName: userLastname,
      },
    });

    return findUser;
  } catch (e) {
    console.log("Opss ..." + e);
    return e;
  }
}

export { findsUser };
