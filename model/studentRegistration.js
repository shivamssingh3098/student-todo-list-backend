const mongoose = require("mongoose");
const validator = require("validator");
const studentModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
    },
    email: {
      type: String,
      unique: [true, "Email Already Present"],
      required: [true, "Please enter a valid email"],
    },
    mobile: {
      type: String,
      required: true,
      // unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    img: { type: String },
    password: { type: String, required: [true, "Enter valid password"] },

    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: { type: String, required: true },
  }
);

const Students = mongoose.model("Students", studentModel);

module.exports = Students;
