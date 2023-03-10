import ApiError from "../exсeptions/apiError.js";
export default function errorMiddleware(err, req, res, next) {
  console.log(err);
  // if (err.status == 401) {
  //   return res
  //     .status(err.status)
  //     .json({ message: err.message, errors: err.errors });
  // }
  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({ success: err.message, errors: err.errors });
  }
  return res.status(500).json({ success: "server error" });
}
