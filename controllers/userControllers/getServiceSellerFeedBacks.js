const { ServiceSeller } = require("../../database/models");

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id, "id");

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
