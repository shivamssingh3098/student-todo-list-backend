require("dotenv").config();
const asyncHandler = require("express-async-handler");

const jwt = require("jsonwebtoken");

const validateWebToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split("")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);
        console.log(err);
        throw new Error("user not authorized");
      } else {
        res.user = decoded.user;
        console.log(decoded);
        next();
      }
    });
    if (!token) {
      throw new Error("User not authorized");
    }
  }
});

module.exports = validateWebToken;
