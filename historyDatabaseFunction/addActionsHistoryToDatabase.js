import History from "../models/History.js";

async function addNewEventToDatabase(action) {
  try {
    const newAtion = await new History({ action: action });
    await newAtion.save();
    return newAtion;
  } catch (e) {
    console.log(e);
    return e;
  }
}

export { addNewEventToDatabase };
