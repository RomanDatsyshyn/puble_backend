const mongoose = require("mongoose");
const { Schema } = mongoose;

const Promocode = new Schema({
  cardNumber: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  typeOfApp: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Promocodes", Promocode);
