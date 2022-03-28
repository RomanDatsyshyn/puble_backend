const { ServiceSeller } = require("../../database/models");

module.exports = async (req, res) => {
  try {
    const { categories } = req.body;

    await ServiceSeller.updateOne({ _id: req.user }, { $set: { categories } });

    res.status(200).end();
  } catch (e) {
    res.json({
      success: false,
      data: e.controller || "changeCategoriesOfServiceSeller",
      errors: e.message,
    });
  }
};
