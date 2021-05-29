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
    const user = await User.findOne({ email: email });
    if (!user) {
      res
        .status(401)
        .json({
          success: false,
          message: "Email Doesn't Exist, Create An Account!"
        });
    }
    if (user.password !== password) {
      res.status(403).json({ success: false, message: "Incorrect Password" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(403).json({ success: false, message: "Authentication Failed" });
  }
});

module.exports = router;
