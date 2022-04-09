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
  categoryRouter,
  serviceRouter,
  serviceSellerRouter,
} = require("./routes");

app.use("/auth", authRouter);
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

const { User, Order, Offer, ServiceSeller } = require("./database/models");

io.on("connection", (socket) => {
  socket.on("join", ({ room }) => socket.join(room));

  socket.on("sendUserOrderToServiceSellers", async ({ userId, serviceId }) => {
    const order = new Order({
      user: userId,
      date: Date.now(),
      isCompleted: false,
    });

    const savedOrder = await order.save();

    let avaliableServiceSellers = [];

    const serviceSellers = await ServiceSeller.find({});

    serviceSellers.map((s) => {
      // Replace categories to services
      s.categories.map((c) => {
        if (c == serviceId) avaliableServiceSellers.push(s);
      });
    });

    avaliableServiceSellers.map(async (s) => {
      const serviceSeller = await ServiceSeller.findById(s._id);
      serviceSeller.feed = serviceSeller.feed.concat(savedOrder._id);
      await serviceSeller.save();
      io.to(`serviceSellerFeed-${serviceSeller._id}`).emit(
        "message",
        serviceSeller.feed.reverse()
      );
    });
  });

  socket.on(
    "sendServiceSellerOfferToUser",
    async ({ userId, serviceSellerId }) => {
      const offer = new Offer({
        serviceSeller: serviceSellerId,
      });

      const savedOffer = await offer.save();

      const user = await User.findById(userId);
      user.feed = user.feed.concat(savedOffer._id);
      await user.save();

      io.to(`userFeed-${user._id}`).emit("message", user.feed.reverse());
    }
  );

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
