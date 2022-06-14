const { User } = require("../../database/models");

module.exports = async (req, res) => {
  try {
    console.log(1);
    const { latitude, longitude } = req.query;

    console.log(latitude, "latitude");
    console.log(longitude, "longitude");

    res.status(200).json({
      success: true,
      data: [],
      errors: null,
    });
  } catch (e) {
    res.json({
      success: false,
      data: e.controller || "getSpecialistsAroundMe",
      errors: e.message,
    });
  }
};
