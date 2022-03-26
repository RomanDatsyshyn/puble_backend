const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderScheme = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  date: {
    type: Date,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    required: true,
  },
});

orderScheme.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Orders", orderScheme);
