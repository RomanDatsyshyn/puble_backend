const { ServiceSeller, OAuthToken } = require("../../database/models");

module.exports = async (req, res) => {
  try {
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

    const { phone } = req.body;

    await ServiceSeller.updateOne(
      { _id: userFromAccessToken[0].user_id },
      { $set: { phone: phone } }
    );

    res.status(200).end();
  } catch (e) {
    res.json({
      success: false,
      data: e.controller || "updatePhone",
      errors: e.message,
    });
  }
};
