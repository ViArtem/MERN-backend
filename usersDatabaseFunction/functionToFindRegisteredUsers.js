import Regist from "../models/RegisteredUsers.js";

async function findsRegistUser(email) {
  try {
    let findUser = await Regist.findOne({
      email: email,
    });

    return findUser;
  } catch (e) {
    console.log("Opss ..." + e);
    return e;
  }
}

async function findsRegisterdUserById(customId) {
  try {
    let findUser = await Regist.findOne({
      customId: customId,
    });

    return findUser;
  } catch (e) {
    console.log("Opss ..." + e);
    return JSON.stringify({ userFoundError: e });
  }
}

export { findsRegistUser, findsRegisterdUserById };
