import History from "../models/History.js";

async function getAllAdministratorHistory() {
  try {
    const history = await History.find({}).lean();
    let userAction = [];
    history.forEach((user) => userAction.push(user.action));
    return userAction;
  } catch (e) {
    console.log(e);
    return e;
  }
}

export { getAllAdministratorHistory };
