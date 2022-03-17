const { OAuthToken, User } = require("../../database/models");
const { tokenizer, checkPasswordHash } = require("../../helpers");
const { USER_ROLES, JWT_METHOD } = require("../../constants");

module.exports = async (req, res) => {
  try {
    const { phone, password } = req.body;

    const isUserPresent = await User.find({
      phone,
      role_id: USER_ROLES.ADMIN,
    });

    if (isUserPresent[0] == undefined) {
      return res.json({
        success: false,
        data: null,
        errors: `Такого користувача не існує`,
      });
    }

    await checkPasswordHash(isUserPresent[0].password, password);

    const tokens = tokenizer("ADMIN", JWT_METHOD.ADMIN);

    const newOAuth = new OAuthToken({
      user_id: isUserPresent[0].id,
      ...tokens,
    });

    await newOAuth.save();

    res.status(201).json({
      success: true,
      data: tokens,
      errors: null,
    });
  } catch (e) {
    res.json({
      success: false,
      data: e.controller || "authAdmin",
      errors: e.message,
    });
  }
};
