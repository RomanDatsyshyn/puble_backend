module.exports = async (req, res, next) => {
  const { name, email, phone, password } = req.body;
  // const { name, email, phone, password, categories } = req.body;

  let errors = {};

  if (!name) {
    errors.name = "Введіть ваше ім'я";
  }

  if (!email) {
    errors.email = "Введіть ваш Email";
  }

  if (!phone) {
    errors.phone = "Введіть номер телефону";
  }

  if (!password) {
    errors.password = "Введіть пароль";
  }

  // if (!categories) {
  //   console.log(categories);
  //   errors.categories = "Оберіть категорію";
  // }

  if (
    errors.name ||
    errors.email ||
    errors.phone ||
    errors.password
    //|| errors.categories
  ) {
    res.json({
      success: false,
      data: null,
      errors: errors,
    });
  } else {
    if (name.length < 3) {
      errors.name = "Введіть ваше повне ім'я";
    }

    if (!email.includes("@")) {
      errors.age = "Введіть коректний емейл";
    }

    if (phone.length < 9) {
      errors.phone = "Введіть ваш номер телефону правильно";
    }

    if (password.length < 5) {
      errors.password = "Введіть надійний пароль";
    }
  }

  if (
    errors.name ||
    errors.email ||
    errors.phone ||
    errors.password
    // || errors.categories
  ) {
    res.json({
      success: false,
      data: null,
      errors: errors,
    });
  } else {
    next();
  }
};
