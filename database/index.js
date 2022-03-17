require("dotenv").config();
const mongoose = require("mongoose");

module.exports.connection = () => {
  console.log("connecting to database...");
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("connected to database");
    })
    .catch((error) => {
      console.log("error connection to database:", error.message);
    });
};
