import { app } from "../server.js";
import { createRequire } from "node:module";
import { socketData } from "../controllers/contactSocketController.js";
import { connectToDatabase } from "../connectToDatabase.js";
const require = createRequire(import.meta.url);

let io;
const PORT = process.env.PORT || 4000;
// start the socket server
function startSocketServer() {
  try {
    const server = require("http").createServer(app);
    io = require("socket.io")(server, {
      cors: {
        origin: process.env.FRONTEND_URL,
      },
    });

    server.listen(PORT, async () => {
      connectToDatabase();
      console.log("Started socket server...");
    });
    socketData();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
export { io, startSocketServer };
