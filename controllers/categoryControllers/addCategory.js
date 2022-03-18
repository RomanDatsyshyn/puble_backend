const { Category } = require("../../database/models");

module.exports = async (req, res) => {
  try {
    const category = req.body;

    const newCategory = new Category(category);
    await newCategory.save();

    res.status(201).end();
  } catch (e) {
    res.json({
      success: false,
      data: e.controller || "AddCategory",
      errors: e.message,
    });
  }
};
