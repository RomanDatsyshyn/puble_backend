const { OAuthToken } = require("../../database/models");
const { tokenizer } = require("../../helpers");
const { JWT_METHOD } = require("../../constants");

module.exports = async (req, res) => {
  try {
    const token = req.get("Authorization");
    const { id } = res.locals;
    const tokens = tokenizer(JWT_METHOD.USER);

    await OAuthToken.deleteOne({ access_token: token });
    const newOAuth = new OAuthToken({
      user_id: id,
      ...tokens,
    });

    await newOAuth.save();

    res.status(200).json({
      success: true,
      data: tokens,
      errors: null,
    });
  } catch (e) {
    res.json({
      success: false,
      data: e.controller || "refreshToken",
      errors: e.message,
    });
  }
};
