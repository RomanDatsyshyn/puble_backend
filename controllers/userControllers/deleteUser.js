const User = require("../../database/models/User");
const OAuthModel = require("../../database/models/OAuthToken");

module.exports = async (req, res) => {
  try {
    const token = req.get("Authorization");

    await OAuthModel.deleteOne({ access_token: token });

    await User.deleteOne({ _id: req.user });

    res.status(204).end();
  } catch (e) {
    res.json({
      success: false,
      data: e.controller || "deleteUser",
      errors: e.message,
    });
  }
};
