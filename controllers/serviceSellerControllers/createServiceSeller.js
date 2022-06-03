const { USER_ROLES, USER_STATUS } = require("../../constants");
const { passwordHasher } = require("../../helpers");
const { ServiceSeller, Service } = require("../../database/models");

module.exports = async (req, res) => {
  try {
    const serviceSeller = req.body;

    serviceSeller.photo =
      req.file === undefined ? "static/no-photo.png" : req.file.path;
    serviceSeller.role_id = USER_ROLES.SERVICESELLER;
    serviceSeller.status_id = USER_STATUS.ACTIVE;
    serviceSeller.password = await passwordHasher(serviceSeller.password);
    serviceSeller.rating = {
      sum: 0,
      amount: 0,
    };
    const newServiceSeller = new ServiceSeller(serviceSeller);

    await newServiceSeller.save();

    if (serviceSeller.services !== []) {
      serviceSeller.services.map(async (s) => {
        const serviceData = await Service.findById(s);
        serviceData.sellers = serviceData.sellers.concat(newServiceSeller._id);

        await Service.updateOne(
          { _id: serviceData._id },
          { $set: { sellers: serviceData.sellers } }
        );
      });
    }

    res.status(201).end();
  } catch (e) {
    res.json({
      success: false,
      data: e.controller || "CreateServiceSeller",
      errors: e.message,
    });
  }
};
