const { Promocode } = require("../../database/models");

module.exports = async (req, res) => {
  try {
    const promo = req.body;

    const newPromo = new Promocode(promo);

    await newPromo.save();

    res.status(201).end();
  } catch (e) {
    res.json({
      success: false,
      data: e.controller || "CreatePromocode",
      errors: e.message,
    });
  }
};
