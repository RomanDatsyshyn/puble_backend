const jwt = require("jsonwebtoken");

const { JWT_SECRET, JWT_METHOD } = require("../constants");

module.exports = (id, method) => {
  if (method === JWT_METHOD.ADMIN) {
    const access_token = jwt.sign({ id }, JWT_SECRET.ADMIN_ACCESS, {
      expiresIn: "24h",
    });
    const refresh_token = jwt.sign({ id }, JWT_SECRET.ADMIN_REFRESH, {
      expiresIn: "96h",
    });

    return {
      access_token,
      refresh_token,
    };
  }

  if (method === JWT_METHOD.USER || method === JWT_METHOD.SERVICESELLER) {
    const access_token = jwt.sign({ id }, JWT_SECRET.ACCESS, {});
    const refresh_token = jwt.sign({ id }, JWT_SECRET.REFRESH, {
      expiresIn: "96h",
    });

    return {
      access_token,
      refresh_token,
    };
  }
};
