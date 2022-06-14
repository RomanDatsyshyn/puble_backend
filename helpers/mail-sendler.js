const nodeoutlook = require("nodejs-nodemailer-outlook");

module.exports = async (res, email) => {
  const code = Math.floor(1000 + Math.random() * 9000);

  nodeoutlook.sendEmail({
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
    from: process.env.EMAIL,
    to: email,
    subject: "Ваш код відновлення паролю",
    text: `Код - ${code}`,
    onError: (e) => console.log(e),
    onSuccess: () => {
      res.status(200).json({
        success: true,
        data: code,
        errors: null,
      });
    },
  });
};
