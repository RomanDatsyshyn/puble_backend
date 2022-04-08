require("dotenv").config();
const http = require("http");
const cors = require("cors");
const express = require("express");

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

server.listen(process.env.PORT, (err) =>
  console.log(err ? err : `Server listening on port ${process.env.PORT}...`)
);
