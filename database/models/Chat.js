const mongoose = require("mongoose");
const { Schema } = mongoose;

const Chat = new Schema({
  serviceSellerId: {
    type: String,
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
