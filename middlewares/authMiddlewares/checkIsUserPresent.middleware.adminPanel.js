const { User } = require("../../database/models");

module.exports = async (req, res, next) => {
  const { user_id } = req.params;

  const user = await User.findById(user_id);

  if (!user) {
    return next(
      res.json({
        success: false,
        data: null,
        errors: `Немає такого користувача`,
      })
    );
  }

  req.user = user;

  next();
};
