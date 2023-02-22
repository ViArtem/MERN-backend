import { Router } from "express";
const routerFindContact = Router();
import { findsUser } from "../contactDatabaseFunc/findContactInDatabaseFuncGeneral.js";
import { splitFullName } from "../otherFunc/string.js";

let foundUser;
let userName;
let userLastname;

//Processes a request to find a user
routerFindContact.post("/find", async (req, res) => {
  try {
    userName = splitFullName(req.body.fullName)[0];
    userLastname = splitFullName(req.body.fullName)[1];
    if (userLastname == "undefined" || userName == "undefined") {
      return res.status(415).json({ found: "User no found" });
    }
    // Тhe found user object
    foundUser = await findsUser(userName, userLastname);

    if (foundUser != null) {
      res.status(200).send(foundUser);
    } else res.status(415).json({ found: "User no found" });
  } catch (e) {
    res.status(e.status).send(JSON.stringify(`Error ${e}`));
  }
});

export { routerFindContact, userName, foundUser, userLastname }; //
