//A function that adds a new user

import { addUserToDatabase } from "../contactDatabaseFunc/addContactToDatabaseGeneral.js";
//Аrray with first and last name
import { splitFullName } from "../otherFunc/string.js";

import { Router } from "express";
const routerAddContact = Router();

//Variables that will contain user data
let addFirstName;
let addLastName;
let addNumber;

//Adding a user to the database
routerAddContact.post("/add", async (req, res) => {
  //routerAdd
  console.log(req.headers);
  try {
    //Phone number validation

    const regularExpretionNumber =
      /^(?:\+[1-9]{1,3})?(?:[0-9]{3}[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|044[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|044[0-9]{7})$/;
    let numberUser = req.body.number;

    let validateUserNumber = numberUser.match(regularExpretionNumber);

    //Name validation
    const regularExpretionName = /^[a-z]+ [a-z]+$/gi;
    let fullNameBody = req.body.fullName;

    let userFullNameForVerification = splitFullName(fullNameBody)
      .join(" ")
      .match(regularExpretionName);

    //Сhecking if the data is valid, if so the user is added
    if (validateUserNumber != null && userFullNameForVerification != null) {
      addFirstName = splitFullName(fullNameBody)[0];
      addLastName = splitFullName(fullNameBody)[1];

      addNumber = numberUser;
      let aaUserId = req.body.owner;
      if (addLastName == "undefined") {
        res.json({ error: "Enter last name" }).status(415);
      } else {
        let newUser = await addUserToDatabase(
          addFirstName,
          addLastName,
          addNumber,
          aaUserId
        );

        res.status(200).send(newUser);
      }
    } else {
      res.status(415).json({ error: "The number or name is not valid" });
    }
  } catch (error) {
    console.log("Wrong number", error);
    res.status(500).json(JSON.stringify(`Server error ${error}`));
  }
});
export { routerAddContact, addFirstName, addLastName, addNumber };
