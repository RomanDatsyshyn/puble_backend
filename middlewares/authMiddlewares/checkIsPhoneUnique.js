const { User } = require("../../database/models");

module.exports = async (req, res, next) => {
  const { phone } = req.body;

  const user = await User.findOne({ phone });

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
