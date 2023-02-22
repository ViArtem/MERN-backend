import { io } from "../startServers/socketServer.js";

import { addUserToDatabaseSocket } from "./addContactSocket-router.js";

import { findUserByName } from "./findContactSocket-router.js";

import { splitFullName } from "../otherFunc/string.js";

import { delleteUserFromDatabaseFunction } from "../contactDatabaseFunc/deleteContactFromDatabaseGeneral.js";

import { updateUser } from "./editContactSocket-router.js";

import { addNewEventToDatabase } from "../historyDatabaseFunction/addActionsHistoryToDatabase.js";

let connections = [];

//handles socket requests
function socketData() {
  io.sockets.on("connection", (socket) => {
    console.log("connected");
    connections.push(socket);

    socket.on("disconnect", () => {
      connections.splice(connections.indexOf(socket), 1);
      console.log("Disconnect");
    });
    // Adding a user
    socket.on("send user value", async (data) => {
      const addStatus = await addUserToDatabaseSocket(data);
      //console.log(`Socket: Add request ${data.fullName}`);
      await addNewEventToDatabase(`Socket: Add ${data.fullName}`);
      if (addStatus.name) {
        io.sockets.emit("add user", {
          newUserData: addStatus,
        }); // Send information from the server to the client
      } else {
        io.sockets.emit("add user", {
          userErrorName: addStatus,
        });
      }
    });

    //User search

    socket.on("find user value", async (data, id) => {
      const foundData = await findUserByName(data);
      if (foundData == "User not found") {
        io.sockets.emit("find user", {
          userFirstName: "User not found",
        });
        socket.emit("findOne user", {
          userFirstName: "User not found",
        });
      } else {
        io.sockets.emit("find user", {
          foundData,
        });
        socket.emit("findOne user", {
          foundData,
        });
      }
    });

    // Deleting a user
    socket.on("delete user value", async (data) => {
      let deletedUser = await delleteUserFromDatabaseFunction(
        splitFullName(data.fullName)[0],
        splitFullName(data.fullName)[1],
        data.ownerId,
        data.userRole
      );
      if (deletedUser == "Delete error") {
        io.sockets.emit("delete user", {
          userFirstName: "Delete error",
          deleted: false,
        });
      } else {
        io.sockets.emit("delete user", {
          userFirstName: data,
          deleted: true,
        });
      }
    });

    // Editing a user
    socket.on("edit user value", async (data) => {
      const update = await updateUser(
        data.newFullName,
        data.newNumber,
        data.idForUpdate,
        data.ownerId,
        data.userRole
      );
      if (update) {
        io.sockets.emit("edit user", {
          userFirstName: data.newFullName,
        });
      } else {
        io.sockets.emit("edit user", {
          userFirstName: "Incorrect data",
        });
      }
    });
  });
}
export { socketData };
