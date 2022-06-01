const { mailSendler } = require("../../helpers");

module.exports = async (req, res) => {
  try {
    const { email } = req.body;

    await mailSendler(res, email);
  } catch (e) {
    res.json({
      success: false,
      data: e.controller || "sendRecoveryCode",
      errors: e.message,
    });
  }
};
