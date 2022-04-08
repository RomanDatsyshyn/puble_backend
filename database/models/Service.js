const mongoose = require("mongoose");
const { Schema } = mongoose;

const serviceScheme = new Schema({
  name: {
    type: String,
    require: true,
  },
  sellers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceSellers",
      required: false,
    },
  ],
});

serviceScheme.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Services", serviceScheme);
