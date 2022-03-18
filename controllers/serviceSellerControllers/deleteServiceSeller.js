const { ServiceSeller, OAuthToken } = require("../../database/models");

module.exports = async (req, res) => {
  try {
    const token = req.get("Authorization");

    await OAuthToken.deleteOne({ access_token: token });

    await ServiceSeller.deleteOne({ _id: req.user });

    res.status(204).end();
  } catch (e) {
    res.json({
      success: false,
      data: e.controller || "deleteServiceSeller",
      errors: e.message,
    });
  }
};
