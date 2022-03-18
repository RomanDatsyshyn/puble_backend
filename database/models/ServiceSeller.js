const mongoose = require("mongoose");
const { Schema } = mongoose;

const serviceSellerScheme = new Schema({
  name: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  role_id: {
    type: Number,
    require: false,
  },
  status_id: {
    type: Number,
    require: false,
  },
  photo: {
    type: String,
    required: true,
  },
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categories",
      required: true,
    },
  ],
  rating: {
    type: Number,
    require: false,
  },
});

serviceSellerScheme.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("ServiceSellers", serviceSellerScheme);
