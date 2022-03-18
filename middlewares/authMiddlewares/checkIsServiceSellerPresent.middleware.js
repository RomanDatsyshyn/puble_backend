const { ServiceSeller } = require("../../database/models");

module.exports = async (req, res, next) => {
  const { phone } = req.body;

  const serviceSeller = await ServiceSeller.findOne({ phone });

  console.log(serviceSeller);

  if (!serviceSeller) {
    res.json({
      success: false,
      data: null,
      errors: `Користувача з таким номером не існує`,
    });
  } else {
    res.locals.id = serviceSeller.id;
    next();
  }
};
