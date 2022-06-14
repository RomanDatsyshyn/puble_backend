const mongoose = require("mongoose");
const { Schema } = mongoose;

const CategoryPropositionScheme = new Schema({
  name: {
    type: String,
    require: true,
  },
});

CategoryPropositionScheme.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model(
  "CategoryProposition",
  CategoryPropositionScheme
);
