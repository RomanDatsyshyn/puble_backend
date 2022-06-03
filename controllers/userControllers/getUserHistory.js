const { User, ServiceSeller } = require("../../database/models");

module.exports = async (req, res) => {
  try {
    const userHistory = [];
    const userData = await User.findById(req.user).populate("history");

    for (let i = 0; i < userData.history.length; i++) {
      const serviceSellerData = await ServiceSeller.findById(
        userData.history[i].serviceSeller
      );

      userHistory.push({
        id: userData.history[i]._id,
        date: userData.history[i].date,
        serviceSellerId: serviceSellerData._id,
        name: serviceSellerData.name,
        phone: serviceSellerData.phone,
        profession: serviceSellerData.profession,
        photo: serviceSellerData.photo,
        location: userData.history[i].location,
        rating: serviceSellerData.rating,
        // add social networks link
      });
    }

    res.status(200).json({
      success: true,
      data: userHistory,
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
