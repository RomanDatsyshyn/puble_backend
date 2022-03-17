module.exports = (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    return next(
      res.json({
        success: false,
        data: null,
        errors: `Введіть новий пароль`,
      })
    );
  }

  if (password.length < 6) {
    return next(
      res.json({
        success: false,
        data: null,
        errors: "Пароль має бути більше ніж 5 символів",
      })
    );
  }

  next();
};
