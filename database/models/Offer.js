const mongoose = require("mongoose");
const { Schema } = mongoose;

const offersScheme = new Schema({
  serviceSeller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServiceSellers",
  },
});

offersScheme.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Offers", offersScheme);
