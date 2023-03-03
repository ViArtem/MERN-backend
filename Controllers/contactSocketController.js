import { io } from "../startServers/socketServer.js";
import contactHttpService from "../Services/contactService.js";
import otherFunction from "../Exсeptions/otherFunction.js";
import adminDatabaseService from "../Database/adminDatabaseService.js";
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
      //validation
      if (data.fullName.trim() == "" || data.number.trim() == "") {
        return io.sockets.emit("add user", {
          userErrorName: "The value cannot be empty",
        });
      }
      if (otherFunction.dataValidation(data.fullName, data.number)) {
        return io.sockets.emit("add user", {
          userErrorName: otherFunction.dataValidation(
            data.fullName.trim(),
            data.number.trim()
          ).success,
        });
      }
      //request to create a contact
      const newSocketUser = await contactHttpService.addNewContact(
        otherFunction.allFirstLettersCapitalized(data.fullName),
        data.number,
        data.ownerId
      );
      if (newSocketUser.success == "Such a contact already exists") {
        return io.sockets.emit("add user", {
          userErrorName: newSocketUser.success,
        });
      }
      io.sockets.emit("add user", {
        newUserData: newSocketUser,
      });
      // add an action to the story
      await adminDatabaseService.addNewAction(
        `Socket: Add ${data.fullName}`,
        Date.now()
      );
    });

    //controller for receiving data to find a contact
    socket.on("find user value", async (data) => {
      if (data.fullName.trim() == "") {
        io.sockets.emit("find user", {
          userFirstName: "The value cannot be empty",
        });
        return socket.emit("findOne user", {
          userFirstName: "The value cannot be empty",
        });
      }

      //request to find a contact
      const foundData = await contactHttpService.findContact(
        otherFunction.allFirstLettersCapitalized(data.fullName.trim())
      );

      if (foundData == null) {
        io.sockets.emit("find user", {
          userFirstName: "User not found",
        });
        socket.emit("findOne user", {
          userFirstName: "User not found",
        });
      } else {
        io.sockets.emit("find user", {
          foundData: foundData,
        });
        socket.emit("findOne user", {
          foundData: foundData,
        });

        // add an action to the story
        await adminDatabaseService.addNewAction(
          `Socket: Find ${data.fullName}`,
          Date.now()
        );
      }
    });

    // controller to receive data to delete a contact
    socket.on("delete user value", async (data) => {
      // request to delete a contact
      const deletedUser = await contactHttpService.deleteContact(
        data.fullName,
        data.ownerId,
        data.userRole
      );

      io.sockets.emit("delete user", {
        userFirstName: deletedUser,
      });

      // add an action to the story
      await adminDatabaseService.addNewAction(
        `Socket: Delete ${data.fullName}`,
        Date.now()
      );
    });

    // controller to receive data to update the contact
    socket.on("edit user value", async (data) => {
      //validation
      if (data.newFullName.trim() == "" || data.newNumber.trim() == "") {
        return io.sockets.emit("edit user", {
          userErrorName: "The value cannot be empty",
        });
      }

      if (
        otherFunction.dataValidation(
          data.newFullName.trim(),
          data.newNumber.trim()
        )
      ) {
        return io.sockets.emit("edit user", {
          userErrorName: otherFunction.dataValidation(
            data.newFullName.trim(),
            data.newNumber.trim()
          ).success,
        });
      }

      // request to update a contact
      const updatingUser = await contactHttpService.updateContact(
        otherFunction.allFirstLettersCapitalized(data.newFullName),
        data.newNumber.trim(),
        data.idForUpdate.trim(),
        data.owner,
        data.userRole
      );
      if (updatingUser.fullName) {
        io.sockets.emit("edit user", {
          userFirstName: updatingUser,
        });

        // add an action to the story
        await adminDatabaseService.addNewAction(
          `Socket: Edit ${updatingUser.fullName}`,
          Date.now()
        );
      } else {
        io.sockets.emit("edit user", {
          userFirstName: "User don't update",
        });
      }
    });
  });
}
export { socketData };
