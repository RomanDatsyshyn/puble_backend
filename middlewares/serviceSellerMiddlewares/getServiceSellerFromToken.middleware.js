const { OAuthToken } = require("../../database/models");

module.exports = async (req, res, next) => {
  const token = req.get("Authorization");

  const userFromAccessToken = await OAuthToken.find({
    access_token: token,
  });

  if (!userFromAccessToken) {
    return next(
      res.json({
        success: false,
        data: null,
        errors: "Немає користувача",
      })
    );
  }

  req.user = userFromAccessToken[0].user_id;

  next();
};
