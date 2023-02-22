import { Router } from "express";
//import { foundUser } from "./findContact-router.js";
import { editUser } from "../contactDatabaseFunc/editContactInDatabaseFuncHttp.js";
import { splitFullName } from "../otherFunc/string.js";

const routerEditContact = Router();

let userIdWeAreUpdating;
let newUserFirstName;
let newUserLastName;
let newUserNum;

// Handles a user update request
routerEditContact.post("/edit", async (req, res) => {
  try {
    //New phone number validation
    const regularExpretionNumber =
      /^(?:\+[1-9]{1,3})?(?:[0-9]{3}[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|044[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|044[0-9]{7})$/; ///^[\+][1-9]{1,4}\d{10,11}/
    let numberUser = req.body.number;
    const validateNewUserNumber = numberUser.match(regularExpretionNumber);

    //New name validation
    const regularExpretionName = /^[a-z]+ [a-z]+$/gi;
    const userFullNameForVerification =
      req.body.fullName.match(regularExpretionName);

    if (validateNewUserNumber != null && userFullNameForVerification != null) {
      newUserFirstName = splitFullName(req.body.fullName)[0];
      newUserLastName = splitFullName(req.body.fullName)[1];
      newUserNum = numberUser;

      if (newUserLastName == "undefined") {
        res.status(415).send(JSON.stringify("Enter last name"));
      } else {
        userIdWeAreUpdating = req.body.id;

        let updateUser = await editUser(req.body.ownerId, req.body.userRole);
        if (updateUser != "Update error") {
          res.status(200).send(updateUser);
        } else {
          res.status(404).send(JSON.stringify({ update: "Update error" }));
        }
      }
    } else {
      res.status(415).send(JSON.stringify("Number or name is not valid"));
    }
  } catch (error) {
    res.status(error.status).json({ ServerError: error });
  }
});

export {
  routerEditContact,
  userIdWeAreUpdating,
  newUserFirstName,
  newUserLastName,
  newUserNum,
};
