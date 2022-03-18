const mongoose = require("mongoose");
const { Schema } = mongoose;

const categoryScheme = new Schema({
  name: {
    type: String,
    require: true,
  },
  icon: {
    type: String,
    required: false,
  },
  services: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Services",
    },
  ],
});

categoryScheme.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Categories", categoryScheme);
