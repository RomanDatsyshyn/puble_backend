const {
  User,
  UserHistory,
  ServiceSeller,
  OAuthToken,
} = require("../../database/models");

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

    const { date, location, serviceSeller } = req.body;

    const user = await User.findById(userFromAccessToken[0].user_id);
    const ss = await ServiceSeller.findById(serviceSeller);

    const item = new UserHistory({
      date,
      location,
      serviceSeller: ss._id,
    });

    await item.save();

    user.history = user.history.concat(item);

    await user.save();

    res.status(200).end();
  } catch (e) {
    res.json({
      success: false,
      data: e.controller || "updateHistory",
      errors: e.message,
    });
  }
};
