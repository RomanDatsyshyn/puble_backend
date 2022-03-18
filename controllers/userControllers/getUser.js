const { User } = require("../../database/models");

module.exports = async (req, res) => {
  try {
    const userData = await User.findById(req.user);

    res.status(200).json({
      success: true,
      data: userData,
      errors: null,
    });
  } catch (e) {
    res.json({
      success: false,
      data: e.controller || "getUser",
      errors: e.message,
    });
  }
};
