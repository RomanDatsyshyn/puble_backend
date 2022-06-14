const { ServiceSeller, OAuthToken } = require("../../database/models");
const { passwordHasher } = require("../../helpers");

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

    const { instagram, telegram, viber } = req.body;

    await ServiceSeller.updateOne(
      { _id: userFromAccessToken[0].user_id },
      { $set: { instagram, telegram, viber } }
    );

    res.status(200).end();
  } catch (e) {
    res.json({
      success: false,
      data: e.controller || "updateMyContacts",
      errors: e.message,
    });
  }
};
