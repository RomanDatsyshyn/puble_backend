const { ServiceSeller, Service } = require("../../database/models");

module.exports = async (req, res) => {
  try {
    const { id } = req.params;

    const serviceSeller = await ServiceSeller.findById(req.user);
    serviceSeller.services = serviceSeller.services.concat(id);

    await ServiceSeller.updateOne(
      { _id: req.user },
      { $set: { services: serviceSeller.services } }
    );

    const serviceData = await Service.findById(id);
    serviceData.sellers = serviceData.sellers.concat(req.user);

    await Service.updateOne(
      { _id: serviceData._id },
      { $set: { sellers: serviceData.sellers } }
    );

    res.status(200).end();
  } catch (e) {
    res.json({
      success: false,
      data: e.controller || "addServiceOfServiceSeller",
      errors: e.message,
    });
  }
};
