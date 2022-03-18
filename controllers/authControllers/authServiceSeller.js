const { OAuthToken, ServiceSeller } = require("../../database/models");
const { tokenizer, checkPasswordHash } = require("../../helpers");
const { USER_ROLES, USER_STATUS, JWT_METHOD } = require("../../constants");

module.exports = async (req, res) => {
  try {
    const { phone, password } = req.body;

    const { id } = res.locals;

    const isServiceSellerPresent = await ServiceSeller.find({
      phone,
      role_id: USER_ROLES.SERVICESELLER,
    });

    if (isServiceSellerPresent[0] == undefined) {
      return res.json({
        success: false,
        data: null,
        errors: `Такого користувача не існує`,
      });
    }

    if (isServiceSellerPresent[0].status_id !== USER_STATUS.ACTIVE) {
      return res.json({
        success: false,
        data: null,
        errors: `Ваш акаунт заблокований`,
      });
    }

    await checkPasswordHash(
      isServiceSellerPresent[0].password,
      password.toString()
    );

    const tokens = tokenizer(id, JWT_METHOD.SERVICESELLER);

    const newOAuth = new OAuthToken({
      user_id: isServiceSellerPresent[0].id,
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
      data: e.controller || "authServiceSeller",
      errors: e.message,
    });
  }
};
