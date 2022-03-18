const { tokenVerificator } = require("../../helpers");
const { JWT_METHOD } = require("../../constants");

module.exports = async (req, res, next) => {
  const token = req.get("Authorization");

  if (!token) {
    return next(
      res.json({
        success: false,
        data: null,
        errors: "Немає токена",
      })
    );
  }

  await tokenVerificator(res, next, token, JWT_METHOD.USER);

  next();
};
