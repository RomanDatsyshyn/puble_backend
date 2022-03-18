const { Service, Category } = require("../../database/models");

module.exports = async (req, res) => {
  try {
    const { name, icon, categoryId } = req.body;

    const category = await Category.findById(categoryId);

    const service = new Service({
      name,
      icon,
    });

    const savedService = await service.save();

    category.services = category.services.concat(savedService._id);
    await category.save();

    res.status(201).end();
  } catch (e) {
    res.json({
      success: false,
      data: e.controller || "AddService",
      errors: e.message,
    });
  }
};
