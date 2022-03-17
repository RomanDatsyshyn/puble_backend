const { USER_ROLES, USER_STATUS } = require("../../constants");
const { passwordHasher } = require("../../helpers");
const User = require("../../database/models/User");

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
      const user = req.body;

      user.photo = req.file.path;
      user.role_id = USER_ROLES.USER;
      user.status_id = USER_STATUS.ACTIVE;
      user.password = await passwordHasher(user.password);

      const newUser = new User(user);

      await newUser.save();

      res.status(201).end();
    }
  } catch (e) {
    res.json({
      success: false,
      data: e.controller || "CreateUser",
      errors: e.message,
    });
  }
};
