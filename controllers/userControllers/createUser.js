const { USER_ROLES, USER_STATUS } = require("../../constants");
const { passwordHasher } = require("../../helpers");
const { User } = require("../../database/models");

module.exports = async (req, res) => {
  try {
    const user = req.body;

    user.photo = req.file === undefined ? "static/no-photo.png" : req.file.path;
    user.role_id = USER_ROLES.USER;
    user.status_id = USER_STATUS.ACTIVE;
    user.password = await passwordHasher(user.password);

    const newUser = new User(user);

    await newUser.save();

    res
      .status(201)
      .json({
        success: true,
        data: null,
        errors: null,
      })
      .end();
  } catch (e) {
    res.json({
      success: false,
      data: e.controller || "CreateUser",
      errors: e.message,
    });
  }
};
