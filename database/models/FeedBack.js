const mongoose = require("mongoose");
const { Schema } = mongoose;

const feedBackScheme = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  date: {
    type: Date,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

feedBackScheme.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("FeedBacks", feedBackScheme);
