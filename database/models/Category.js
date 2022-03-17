const mongoose = require("mongoose");
const { Schema } = mongoose;

const categoryScheme = new Schema({
  name: {
    type: String,
    require: true,
  },
  services: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Services",
    },
  ],
  icon: {
    type: String,
    required: true,
  },
});

categoryScheme.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Categories", categoryScheme);
