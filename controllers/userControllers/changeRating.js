const { ServiceSeller } = require("../../database/models");
const { passwordHasher } = require("../../helpers");

module.exports = async (req, res) => {
  try {
    const { email, rating } = req.body;

    await ServiceSeller.updateOne({ email }, { $set: { rating } });

    res.status(200).end();
  } catch (e) {
    res.json({
      success: false,
      data: e.controller || "changeRating",
      errors: e.message,
    });
  }
};
