import adminDatabaseService from "../Database/adminDatabaseService.js";
function setHistory(req, res, next) {
  try {
    if (req.body.action) {
      adminDatabaseService.addNewAction(
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
