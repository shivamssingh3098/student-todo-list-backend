const express = require("express");
const router = express.Router();
const {
  getStudents,
  editStudent,
  deleteStudent,
  createStudent,
  inputStudentImage,
  login,
} = require("../controller/studentController");
const { upload } = require("../middleWare/uploadFile");
const validateWebToken = require("../middleWare/validateTokenHandler");
const { userLoginTest } = require("../controller/userController/user");

router.route("/getStudents").get(getStudents);
router.route("/edit/:id").put(editStudent);
router.route("/delete/:id").delete(deleteStudent);
router.route("/create").post(createStudent);
router.route("/imageUpload/:id").post(upload.single("img"), inputStudentImage);
router.route("/login").post(login);
router.route("/userTest").get(validateWebToken, userLoginTest);
module.exports = router;

// router
//   .route("/restaurant/aadhar")
//   .post(
//     protect,
//     imageUpload.single("file"),
//     adminRestaurantController.createAndUploadAadhar
//   );
