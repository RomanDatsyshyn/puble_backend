const mongoose = require("mongoose");
const { Schema } = mongoose;

const userHistoryScheme = new Schema({
  date: {
    type: String,
    require: true,
  },
  location: {
    type: String,
    require: true,
  },
  serviceSeller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServiceSellers",
    required: true,
  },
});

userHistoryScheme.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("UserHistory", userHistoryScheme);
