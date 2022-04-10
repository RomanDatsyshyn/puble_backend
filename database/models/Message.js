const mongoose = require("mongoose");
const { Schema } = mongoose;

const Message = new Schema({
  text: {
    type: String,
    require: true,
  },
  time: {
    type: String,
    require: true,
  },
  whoIsTheSender: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Message", Message);
