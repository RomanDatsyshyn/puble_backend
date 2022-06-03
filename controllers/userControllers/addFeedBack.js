const {
  ServiceSeller,
  OAuthToken,
  FeedBack,
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

    const { serviceSellerId, date, text, rating } = req.body;

    const ss = await ServiceSeller.findById(serviceSellerId);

    const item = new FeedBack({
      date,
      text,
    });

    await item.save();

    ss.Feedbacks = ss.Feedbacks.concat(item);
    ss.rating.sum = ss.rating.sum + rating;
    ss.rating.amount = ss.rating.amount + 1;

    await ss.save();

    res.status(200).end();
  } catch (e) {
    res.json({
      success: false,
      data: e.controller || "addFeedBack",
      errors: e.message,
    });
  }
};
