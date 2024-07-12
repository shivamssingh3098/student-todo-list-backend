const nodemailer = require("nodemailer");

exports.sendMails = async (req, res) => {
  let emailsArrays = req.body.emails;
  let rec = "";
  for (let i = 0; i < emailsArrays.length; i++) {
    rec = rec + "," + emailsArrays[i];
  }
  console.log("email is ", rec);

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "isaias55@ethereal.email",
      pass: "qPWX3n2Mfe6jXTHfVp",
    },
  });

  // send mail with defined transport object

  const info = await transporter.sendMail({
    from: '"Shivam Singh 👻" <shivamssingh3098@gmail.com>', // sender address
    to: rec, // list of receivers
    subject: "Hello shivam how are you ✔", // Subject line
    text: "mai to bdiya hu yar tum btao", // plain text body
    html: "<b>Hello world?</b>", // html body
  });
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  res.send("done");
  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  //
  // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
  //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
  //       <https://github.com/forwardemail/preview-email>
  //
};

// main().catch(console.error);
// module.exports = sendMails;
