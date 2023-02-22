import { Schema, model } from "mongoose";

// Scheme for saving contacts in the database
const shem = new Schema({
  name: {
    firstName: String,
    lastName: String,
  },
  number: String,
  owner: String,
});

export default model("User", shem);
