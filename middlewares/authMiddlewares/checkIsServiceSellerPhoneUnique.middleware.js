const { ServiceSeller } = require("../../database/models");

module.exports = async (req, res, next) => {
  const { phone } = req.body;

  const serviceSeller = await ServiceSeller.findOne({ phone });

  if (serviceSeller) {
    res.json({
      success: false,
      data: null,
      errors: `Користувач з таким номером вже існує`,
    });
  } else {
    next();
  }
};
