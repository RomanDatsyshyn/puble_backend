const { Service } = require("../../database/models");

module.exports = async (req, res) => {
  try {
    const { _id, icon } = req.body;

    await Service.updateOne({ _id }, { $set: { icon } });

    res.status(200).end();
  } catch (e) {
    res.json({
      success: false,
      data: e.controller || "ChangeServiceIcon",
      errors: e.message,
    });
  }
};
