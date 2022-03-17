const UserModel = require("../../database/models/User");

module.exports = async (req, res, next) => {
  const { phone } = req.body;

  const user = await UserModel.findOne({ phone: phone });

  if (user) {
    res.json({
      success: false,
      data: null,
      errors: `Користувач з таким номером вже існує`,
    });
  } else {
    next();
  }
};
