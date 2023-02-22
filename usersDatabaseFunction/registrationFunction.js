import Regist from "../models/RegisteredUsers.js";

async function registNewUser(
  firstName,
  lastName,
  email,
  password,
  refresh,
  customId
) {
  try {
    const registNewUser = await new Regist({
      email,
      firstName,
      lastName,
      password,
      refresh,
      customId,
    });
    await registNewUser.save();
    return registNewUser;
  } catch (e) {
    console.log(e);
    return JSON.stringify({ userRegisterError: e });
  }
}

export { registNewUser };
