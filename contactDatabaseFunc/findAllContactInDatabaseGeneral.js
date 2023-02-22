import e from "express";
import Person from "../models/Contact.js";
//A function that finds all users available in the database
async function findAllPersonFromeDatabase() {
  try {
    return await Person.find({}).lean();
  } catch (error) {
    console.log(error);
    return error;
  }
}

export { findAllPersonFromeDatabase };
