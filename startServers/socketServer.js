import { app } from "../server.js";
import { createRequire } from "node:module";
import { socketData } from "../Routes/socketRoute.js";
import { connectToDatabase } from "../connectToDatabase.js";
import { cors } from "../server.js";
const require = createRequire(import.meta.url);

// const socketIO = require('socket.io')(http, {
//   cors: {
//       origin: "http://localhost:3000"
//   }
// });

let io;
const PORT = process.env.PORT || 4000;
// start the socket server
function startSocketServer() {
  try {
    const server = require("http").createServer(app);
    io = require("socket.io")(server, {
      cors: {
        origin: "http://localhost:3000",
      },
    });

    server.listen(PORT, async () => {
      connectToDatabase();
      console.log("Started socket...");
    });
    socketData();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
export { io, startSocketServer };
