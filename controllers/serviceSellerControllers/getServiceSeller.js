const { ServiceSeller } = require("../../database/models");

module.exports = async (req, res) => {
  try {
    const serviceSellerData = await ServiceSeller.findById(req.user);

    res.status(200).json({
      success: true,
      data: serviceSellerData,
      errors: null,
    });
  } catch (e) {
    res.json({
      success: false,
      data: e.controller || "getServiceSeller",
      errors: e.message,
    });
  }
};
