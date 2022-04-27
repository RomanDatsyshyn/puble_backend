const mongoose = require("mongoose");
const { Schema } = mongoose;

const Message = new Schema({
  typeOfUser: {
    type: Number,
    require: true,
  },
  time: {
    type: String,
    require: true,
  },
  text: {
    type: String,
    require: true,
  },
  status: {
    type: Number, // 0 - unread, 1 - read
    require: true,
  },
});

module.exports = mongoose.model("Message", Message);
