const nodemailer = require("nodemailer");

module.exports = async (res, email) => {
  const code = Math.floor(1000 + Math.random() * 9000);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Your password recovery code",
    text: `Code - ${code}`,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.log(error);
    } else {
      res.status(200).json({
        success: true,
        data: code,
        errors: null,
      });
    }
  });
};
