import { adminAddAction } from "../adapters/adminAdapter.js";
async function setHistory(req, res, next) {
  try {
    if (req.body.action) {
      await adminAddAction(
        `Http: ${req.body.action} ${req.body.fullName}`,
        new Date()
      );
    }

    next();
  } catch (error) {
    console.log(error);
    next();
  }
}

export { setHistory };
