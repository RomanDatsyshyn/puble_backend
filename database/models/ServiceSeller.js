const mongoose = require("mongoose");
const { Schema } = mongoose;

const serviceSellerScheme = new Schema({
  name: {
    type: String,
    require: true,
  },
  kindOfActivity: {
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
  services: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Services",
      required: false,
    },
  ],
  feed: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Orders",
    },
  ],
  Feedbacks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Feedbacks",
    },
  ],
  rating: {
    sum: {
      type: Number,
      require: true,
    },
    amount: {
      type: Number,
      require: true,
    },
  },
  instagram: {
    type: String,
    require: true,
  },
  telegram: {
    type: String,
    require: true,
  },
  viber: {
    type: String,
    require: true,
  },
  isVerified: {
    type: Boolean,
    require: true,
  },
  isPremiumActive: {
    type: Boolean,
    require: true,
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
