require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
// const swaggerJSDoc = require("swagger-jsdoc");
//swaggerJSDoc.

const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");

const path = require("path");
const app = express();
const PORT = process.env.PORT || 8082;
const DB = process.env.DB;
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
const todoRoutes = require("./router/todoRoutes");
const studentRouter = require("./router/studentRouter");
const uploadSingleImage = require("./model/singleImageUpload");
const mailRoutes = require("./router/mailRoute");
// const { upload } = require("./middleWare/uploadFile");
// const { diskStorage } = require("multer");

mongoose
  .connect(DB)
  .then(function () {
    console.log("database connection established");
  })
  .catch(function (err) {
    console.log("Error while connecting" + err.message);
  });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});
app.get("/hi/:shivam", (req, res) => {
  const shivam = req.params.shivam;
  console.log("url data ", shivam);
});
app.use(express.static("images"));
app.use("/api/v1/todos", todoRoutes);
app.use("/api/v1/student", studentRouter);
app.use("/api/v1/mail", mailRoutes);
// app.use("/api/v1/", mailRoutes);

app.post("/api/v1/imageUpload", upload.single("img"), async (req, res) => {
  // console.log("file", req.file);
  try {
    const result = await uploadSingleImage.create({ img: req.file.filename });
    console.log(result);
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
