const mongoose = require("mongoose");
const { Schema } = mongoose;

const Chat = new Schema({
  name: {
    type: String,
    require: true,
  },
  photo: {
    type: String,
    require: true,
  },
  lastMessage: {
    type: String,
    require: true,
  },
  timeOfLastMessage: {
    type: String,
    require: true,
  },
  amountOfNewMessages: {
    type: Number,
    require: true,
  },
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
});

module.exports = mongoose.model("Chat", Chat);
