require("dotenv").config();
const http = require("http");
const cors = require("cors");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const db = require("./database");

db.connection();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

global.appRoot = __dirname;

const {
  userRouter,
  authRouter,
  adminRouter,
  feedRouter,
  categoryRouter,
  serviceRouter,
  serviceSellerRouter,
} = require("./routes");

app.use("/auth", authRouter);
app.use("/feed", feedRouter);
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/service", serviceRouter);
app.use("/categories", categoryRouter);
app.use("/serviceSeller", serviceSellerRouter);

app.use("/usersPhoto", express.static("usersPhoto"));
app.use("/serviceSellersPhoto", express.static("serviceSellersPhoto"));
app.use("/static", express.static("static"));

const server = http.createServer(app);
const io = socketio(server);

const {
  getActiveUser,
  exitRoom,
  newUser,
  getIndividualRoomUsers,
} = require("./helpers/userHelper");
const formatMessage = require("./helpers/formatMessage");

io.on("connection", (socket) => {
  socket.on("join", ({ username, room }) => {
    newUser(socket.id, username, room);
    socket.join(room);

    socket.emit(
      "message",
      formatMessage(username, "Messages are limited to this room! ")
    );

    socket.broadcast
      .to(room)
      .emit(
        "message",
        formatMessage(username, `${username} has joined the room`)
      );

    io.to(room).emit("getUsers", {
      users: getIndividualRoomUsers(room),
    });
  });

  socket.on("chatMessage", ({ username, room, msg }) => {
    io.to(room).emit("message", formatMessage(username, msg));
  });

  // socket.on("disconnect", () => {
  //   const user = exitRoom(socket.id);

  //   if (user) {
  //     io.to(user.room).emit(
  //       "message",
  //       formatMessage("WebCage", `${user.username} has left the room`)
  //     );

  //     // Current active users and room name
  //     io.to(user.room).emit("roomUsers", {
  //       users: getIndividualRoomUsers(user.room),
  //     });
  //   }
  // });
});

server.listen(process.env.PORT, (err) =>
  console.log(err ? err : `Server listening on port ${process.env.PORT}...`)
);
