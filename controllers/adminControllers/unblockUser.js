const { USER_STATUS } = require("../../constants");
const { User, OAuthToken } = require("../../database/models");

module.exports = async (req, res) => {
  try {
    const { _id, status_id } = req.user;

    if (status_id === USER_STATUS.ACTIVE) {
      return res.json({
        success: false,
        data: null,
        errors: `Ви не можете розбанити вже активного користувача`,
      });
    }

    await User.updateOne(
      { _id: _id },
      { $set: { status_id: USER_STATUS.ACTIVE } }
    );
    await OAuthToken.deleteOne({ user_id: _id });

    res.status(200).end();
  } catch (e) {
    res.json({
      success: false,
      data: e.controller || "unblockUser",
      errors: e.message,
    });
  }
};
