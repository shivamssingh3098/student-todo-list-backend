const htmlTemplate = require("./htmlTemplate");
const sendWithGmail = require("./sendWithGmail");
// const sendMailToUser = require("./sendMailToUser");
// const sendMailToUser = require("./sendMailToUser");

exports.sendMail = (req, res) => {
  const message = "hi this is shivam singh";

  const emailBody = req.body.data;

  const options = {
    from: "Shivam Singh <shivamssingh3098@gmail.com>",
    to: '"had9821@gmail.com", "shashinbhoyar1234@gmail.com"',
    subject: "To Check mail is successfully sent or not",
    text: message,
    // html: htmlTemplate.htmlTemplate(message),
    html: htmlTemplate.htmlTemplate(emailBody),
  };

  sendWithGmail.sendWithGmail(options, (info) => {
    console.log("email sent Successfully");
    console.log("message id", info.messageId);
  });
};
