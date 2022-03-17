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

const { userRouter, authRouter } = require("./routes");

app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/usersPhoto", express.static("usersPhoto"));

const server = http.createServer(app);

server.listen(process.env.PORT, (err) =>
  console.log(err ? err : `Server listening on port ${process.env.PORT}...`)
);
