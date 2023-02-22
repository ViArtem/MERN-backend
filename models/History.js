import { Schema, model } from "mongoose";

// Scheme for saving actions in the database
const shemaHistory = new Schema({
  action: { type: String },
});

export default model("History", shemaHistory);
