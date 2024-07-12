const mongoose = require("mongoose");
const singleImageModel = new mongoose.Schema({
  img: {
    type: String,
  },
});

const uploadSingleImage = mongoose.model("UploadSingleImage", singleImageModel);
module.exports = uploadSingleImage;
