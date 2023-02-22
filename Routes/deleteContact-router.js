import { Router } from "express";

const routerDeleteContact = Router();
import { delleteUserFromDatabaseFunction } from "../contactDatabaseFunc/deleteContactFromDatabaseGeneral.js";
import { splitFullName } from "../otherFunc/string.js";
//Handles a request to delete a user
routerDeleteContact.post("/delete", async (req, res) => {
  try {
    let userFirstNameForDelete = req.body.firstName;
    let userLastNameForDelete = req.body.lastName;

    const deletedUser = await delleteUserFromDatabaseFunction(
      userFirstNameForDelete,
      userLastNameForDelete,
      req.body.userId,
      req.body.userRole
    );

    if (deletedUser != "Delete error") {
      res.status(200).send(JSON.stringify(deletedUser));
    } else {
      res.status(400).send(JSON.stringify({ deleteStatus: "Delete error" }));
    }
  } catch (error) {
    res.status(error.status).send(JSON.stringify(`Server error ${error}`));
  }
});
export { routerDeleteContact };
