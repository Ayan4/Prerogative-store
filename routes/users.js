const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", async (req, res) => {
  try {
    const userCreds = await User.find({});
    res.json({ success: true, userCreds });
  } catch (error) {
    res.json({ success: false, msg: "could not fetch users" });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const findEmail = await User.findOne({ email: email });
    if (findEmail) {
      res
        .status(200)
        .json({
          success: false,
          message: "Email already exists, Please Login"
        });
    } else {
      const userCreds = new User({
        name,
        email,
        password
      });
      const user = await userCreds.save();
      res
        .status(201)
        .json({ success: true, user, message: "Acount Created Successfully" });
    }
  } catch (error) {
    res.json({ success: false, message: "some error occured" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email: email });
    if (!foundUser) {
      res
        .status(401)
        .json({
          success: false,
          message: "Email Doesn't Exist, Create An Account!"
        });
    }
    if (foundUser.password !== password) {
      res.status(404).json({ success: false, message: "Incorrect Password" });
    }
    const user = {
      _id: foundUser._id,
      name: foundUser.name,
    }

    res.status(200).json({success: true, user});
  } catch (error) {
    res.status(403).json({ success: false, message: "Authentication Failed" });
  }
});

module.exports = router;
