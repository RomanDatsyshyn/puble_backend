const { OAuthToken } = require("../../database/models");

module.exports = async (req, res) => {
  try {
    const token = req.get("Authorization");

    await OAuthToken.deleteOne({ access_token: token });

    res.status(204).end();
  } catch (e) {
    res.json({
      success: false,
      data: e.controller || "logoutUser",
      errors: e.message,
    });
  }
};
