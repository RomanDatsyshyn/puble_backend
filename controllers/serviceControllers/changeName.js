const { Service } = require("../../database/models");

module.exports = async (req, res) => {
  try {
    const { _id, name } = req.body;

    await Service.updateOne({ _id }, { $set: { name } });

    res.status(200).end();
  } catch (e) {
    res.json({
      success: false,
      data: e.controller || "ChangeServiceName",
      errors: e.message,
    });
  }
};
