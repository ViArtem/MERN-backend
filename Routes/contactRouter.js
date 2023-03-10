import { Router } from "express";
import contactHttpController from "../controllers/contactHttpController.js";

const contactRouter = new Router();

contactRouter.post("/contact/find", contactHttpController.findContact);
contactRouter.post("/contact/add", contactHttpController.addContact);
contactRouter.delete("/contact/delete", contactHttpController.deleteContact);
contactRouter.put("/contact/update", contactHttpController.updateContact);
contactRouter.get("/contact/all", contactHttpController.findAllContact);

export { contactRouter };
