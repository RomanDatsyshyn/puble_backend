const User = require("../../database/models/User");
const { passwordHasher } = require("../../helpers");

module.exports = async (req, res) => {
  try {
    const hashedPassword = await passwordHasher(req.body.password);

    await User.updateOne(
      { _id: req.user },
      { $set: { password: hashedPassword } }
    );

    res.status(200).end();
  } catch (e) {
    res.json({
      success: false,
      data: e.controller || "changePassword",
      errors: e.message,
    });
  }
};
