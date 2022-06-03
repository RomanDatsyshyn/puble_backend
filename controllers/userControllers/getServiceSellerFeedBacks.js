const { ServiceSeller, FeedBack } = require("../../database/models");

module.exports = async (req, res) => {
  try {
    let { id } = req.query;

    const ss = await ServiceSeller.findById(id).populate("Feedbacks");

    res.status(200).json({
      success: true,
      data: ss.Feedbacks,
      errors: null,
    });
  } catch (e) {
    res.json({
      success: false,
      data: e.controller || "updateHistory",
      errors: e.message,
    });
  }
};
