const { ServiceSeller } = require("../../database/models");
const { passwordHasher } = require("../../helpers");

module.exports = async (req, res) => {
  try {
    const { password, email } = req.body;

    const hashedPassword = await passwordHasher(password);

    await ServiceSeller.updateOne(
      { email: email },
      { $set: { password: hashedPassword } }
    );

    res.status(200).end();
  } catch (e) {
    res.json({
      success: false,
      data: e.controller || "changePasswordServiceSeller",
      errors: e.message,
    });
  }
};
