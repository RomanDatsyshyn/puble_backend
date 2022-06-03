const mongoose = require("mongoose");
const { Schema } = mongoose;

const feedBackScheme = new Schema({
  date: {
    type: String,
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

module.exports = mongoose.model("Feedbacks", feedBackScheme);
