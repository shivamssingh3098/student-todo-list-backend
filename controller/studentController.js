require("dotenv").config();
const Students = require("../model/studentRegistration");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uploadSingleImage = require("../model/singleImageUpload");
// sign Up
exports.createStudent = async (req, res) => {
  // console.log(req.img);
  // console.log("registration ", req.file);
  try {
    const { name, email, mobile, address, password } = req.body;
    console.log(req.body);
    // console.log(req.file);

    if (!name || !email || !mobile || !address || !password) {
      res.status(404);
      throw new Error("All fields are required");
    }

    const isEmailAvailable = await Students.findOne({ email });
    if (isEmailAvailable) {
      res.status(400);
      throw new Error("Email is already available");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await Students.create({
      name,
      email,
      mobile,
      address,
      password: hashedPassword,
      // img: req.file.filename,
    });
    if (result) {
      res.status(201).json({
        status: "success",
        message: "Successfully created",
        data: {
          _id: result._id,
          name: result.name,
          email: result.email,
          mobile: result.mobile,
          address: result.address,
        },
      });
    } else {
      res.status(400);
      throw new Error("Not a valid data");
    }
  } catch (error) {
    console.log(error);
  }
};

//  single image input
exports.inputStudentImage = async (req, res) => {
  const id = req.params.id;
  console.log("jfkjdnvjs ", req.file);
  try {
    const studentData = await Students.findById(id);
    studentData.img = req.file.filename;
    await studentData.save();
    console.log(req.file);
    res
      .status(200)
      .json({ status: "success", message: "image uploaded successfully" });
  } catch (error) {
    console.log(error);
  }
};

// signIn

exports.login = async (req, res) => {
  try {
    console.log("login here ", req.body);
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Please enter a email or password");
    }
    const user = await Students.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = jwt.sign(
        {
          user: {
            user: user.name,
            email: user.email,
            mobile: user.mobile,
            id: user.id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "5m" }
      );
      res.status(200).json({
        status: "success",
        message: "sign in successfully",
        accessToken: accessToken,
      });
      // next();
    } else {
      res.status(403);
      throw new Error("Please enter valid email or password");
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getStudents = async (req, res) => {
  try {
    const result = await Students.find();
    res.status(200).json({
      status: "success",
      message: "all students found",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.editStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, mobile, email, address } = req.body;
    const result = await Students.findByIdAndUpdate(
      { _id: id },
      { name: name, mobile: mobile, email: email, address: address }
    );
    res.status(200).json({
      status: "success",
      message: "updated successfully student",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Students.findByIdAndDelete({ _id: id });
    res.status(200).json({
      status: "success",
      message: "deleted student",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.uploadStudentSingleImage = async (req, res) => {
  try {
    const result = await uploadSingleImage.create({ img: req.file.filename });
  } catch (error) {
    console.log(error);
  }
};
