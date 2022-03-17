const bcrypt = require("bcrypt");
const ErrorsHandler = require("../errors/ErrorsHandler");

module.exports = async (hashedPassword, password) => {
  let isPasswordCorrect = await bcrypt.compare(password, hashedPassword);

  if (!isPasswordCorrect) {
    throw new ErrorsHandler("Невірний пароль", 404, "authUser");
  }
};
