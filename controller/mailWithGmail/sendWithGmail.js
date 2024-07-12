const nodemailer = require("nodemailer");

exports.sendWithGmail = async (mailerDetials, cb) => {
  const transport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "shivamssingh3098@gmail.com",
      pass: "dytsqsxxlaecvrup",
    },
  });
  try {
    const info = await transport.sendMail(mailerDetials);
    cb(info);
  } catch (error) {
    console.log(error);
  }
};

// export default sendMailToUser;
// module.exports = sendMailToUser;
