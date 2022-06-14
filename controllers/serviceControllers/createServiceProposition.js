const { ServiceProposition } = require("../../database/models");

module.exports = async (req, res) => {
  try {
    const { name } = req.body;

    const newProposition = new ServiceProposition(name);

    await newProposition.save();

    res.status(201).end();
  } catch (e) {
    res.json({
      success: false,
      data: e.controller || "CreateServiceProposition",
      errors: e.message,
    });
  }
};
