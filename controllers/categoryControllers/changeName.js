const { Category } = require("../../database/models");

module.exports = async (req, res) => {
  try {
    const { _id, name } = req.body;

    await Category.updateOne({ _id }, { $set: { name } });

    res.status(200).end();
  } catch (e) {
    res.json({
      success: false,
      data: e.controller || "ChangeCategoryName",
      errors: e.message,
    });
  }
};
