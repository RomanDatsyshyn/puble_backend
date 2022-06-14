const { CategoryProposition } = require("../../database/models");

module.exports = async (req, res) => {
  try {
    const { name } = req.body;

    const newCategoryProposition = new CategoryProposition(name);

    await newCategoryProposition.save();

    res.status(201).end();
  } catch (e) {
    res.json({
      success: false,
      data: e.controller || "CreateCategoryProposition",
      errors: e.message,
    });
  }
};
