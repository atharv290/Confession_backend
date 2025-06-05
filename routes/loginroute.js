const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const User = require("../models/user");
require("../models/config");
const router = express.Router();
const app = express();
app.use(express.json());
app.use(cookieParser());

router.post("/login", async (req, res) => {
  const { name, pass } = req.body;
  const user = await User.findOne({ email: name });
  console.log(user);
  if (!user) {
    res.send({ val: "Something wents wrong...." });
  } else {
    console.log(pass, user.password);
    bcrypt.compare(pass, user.password).then(function (result) {
      if (result) {

        res.cookie("Email", name, {
          httpOnly: true, // set to true in production
          secure: true, // set to true if using HTTPS
          sameSite: "none", // or 'None' if needed across domains
          maxAge: 24 * 60 * 60 * 1000
        });
        const token = jwt.sign(name,"Atharva");
        res.cookie("Tokan", token, {
          httpOnly: true, // set to true in production
          secure: true, // set to true if using HTTPS
          sameSite: "none", // or 'None' if needed across domains
          maxAge: 24 * 60 * 60 * 1000
        });
        res.send({ val: "Logged Sucessfully....." });
      } else {
        res.send({ val: "Something wents Wrong2" });
      }
    });
  }
});
module.exports = router;
