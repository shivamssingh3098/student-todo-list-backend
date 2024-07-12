const express = require("express");
const router = express.Router();
const sendMailController = require("../controller/sendMailController");
const sendMail = require("../controller/mailWithGmail/sendMail");
router.route("/").post(sendMailController.sendMails);
router.route("/withGmail").post(sendMail.sendMail);
// router.route("/").post(sendWithGmail);

module.exports = router;
