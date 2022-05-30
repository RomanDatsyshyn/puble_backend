const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../constants");

module.exports = async (req, res) => {
  try {
    const token = req.get("Authorization");

    if (!token) {
      return res.json({
        success: false,
        data: null,
        errors: "Немає токена",
      });
    } else {
      jwt.verify(token, JWT_SECRET.ACCESS, (err) => {
        if (err) {
          return res.json({
            success: false,
            data: null,
            errors: "Невірний токен або його дія закінчилася",
          });
        } else {
          return res.json({
            success: true,
            data: null,
            errors: null,
          });
        }
      });
    }

    res.status(200).end();
  } catch (e) {
    res.json({
      success: false,
      data: e.controller || "checkToken",
      errors: e.message,
    });
  }
};
