const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const User = require("../models/user");
require("../models/config");
const router = express.Router();
const app = express();
const PORT = 5000;
const SECRET_KEY = "Atharva"; // use env vars in production
const saltRounds = 10;
app.use(express.json());
app.use(cookieParser());
router.post("/signup", (req, res) => {
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(req.body.password, salt, function (err, hash) {
      const obj = {
        name: req.body.name,
        email: req.body.email,
        password: hash,
      };
      const user = new User(obj);
      const result = user.save();
      console.log(result);
      if (!result) res.send({ val: "Sign Up Unsuccessful.....!" });
      res.send({ val: "Sign Up successful.....!" });
    });
  });
});
module.exports = router;