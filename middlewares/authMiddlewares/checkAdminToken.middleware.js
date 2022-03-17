const { tokenVerificator } = require("../../helpers");
const { JWT_METHOD } = require("../../constants");

module.exports = async (req, res, next) => {
  const token = req.get("Authorization");

  if (!token) {
    res.json({
      success: false,
      data: null,
      errors: "Немає токена",
    });
  } else {
    tokenVerificator(token, JWT_METHOD.ADMIN);

    next();
  }
};
