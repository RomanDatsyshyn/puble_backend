const { ContactUs } = require("../../database/models");

module.exports = async (req, res) => {
  try {
    const data = req.body;

    const newFeedBack = new ContactUs(data);
    await newFeedBack.save();

    res.status(201).end();
  } catch (e) {
    res.json({
      success: false,
      data: e.controller || "ContactUs",
      errors: e.message,
    });
  }
};
