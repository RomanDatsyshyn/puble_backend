const { Category } = require("../../database/models");

module.exports = async (req, res) => {
  try {
    const categories = await Category.find({}).populate("services", {
      name: 1,
      icon: 1,
    });

    res.status(200).json({
      success: true,
      data: categories.map((c) => c.toJSON()),
      errors: null,
    });
  } catch (e) {
    res.json({
      success: false,
      data: e.controller || "getAllCategories",
      errors: e.message,
    });
  }
};
