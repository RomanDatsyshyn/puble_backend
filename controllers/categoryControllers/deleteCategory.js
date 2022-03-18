const { Category } = require("../../database/models");

module.exports = async (req, res) => {
  try {
    const { _id } = req.body;

    await Category.deleteOne({ _id });

    res.status(204).end();
  } catch (e) {
    res.json({
      success: false,
      data: e.controller || "deleteCategory",
      errors: e.message,
    });
  }
};
