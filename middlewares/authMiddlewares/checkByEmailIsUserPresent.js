const { User } = require("../../database/models");

module.exports = async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email: { $regex: email, $options: "i" } });

  if (!user) {
    res.json({
      success: false,
      data: null,
      errors: `Такого користувача не знайдено`,
    });
  } else {
    next();
  }
};
