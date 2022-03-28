const { USER_ROLES, USER_STATUS } = require("../../constants");
const { passwordHasher } = require("../../helpers");
const { ServiceSeller, Service } = require("../../database/models");

module.exports = async (req, res) => {
  try {
    if (req.file === undefined) {
      res
        .json({
          success: false,
          data: null,
          errors: "Завантажте ваше фото",
        })
        .end();
    } else {
      const serviceSeller = req.body;

      serviceSeller.photo = req.file.path;
      serviceSeller.role_id = USER_ROLES.SERVICESELLER;
      serviceSeller.status_id = USER_STATUS.ACTIVE;
      serviceSeller.password = await passwordHasher(serviceSeller.password);

      const newServiceSeller = new ServiceSeller(serviceSeller);

      if (serviceSeller.categories !== undefined) {
        JSON.parse(serviceSeller.categories).map((c) => {
          newServiceSeller.categories = newServiceSeller.categories.concat(c);
        });
      }

      await newServiceSeller.save();

      if (serviceSeller.categories !== undefined) {
        JSON.parse(serviceSeller.categories).map(async (c) => {
          const serviceData = await Service.findById(c);
          serviceData.sellers = serviceData.sellers.concat(
            newServiceSeller._id
          );

          await Service.updateOne(
            { _id: serviceData._id },
            { $set: { sellers: serviceData.sellers } }
          );
        });
      }

      res.status(201).end();
    }
  } catch (e) {
    res.json({
      success: false,
      data: e.controller || "CreateServiceSeller",
      errors: e.message,
    });
  }
};
