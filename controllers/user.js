const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.getUsers = async (req, res) => {
  try {
    const userCreds = await User.find({});
    res.json({ success: true, userCreds });
  } catch (error) {
    res.json({ success: false, msg: "could not fetch users" });
  }
};

exports.userSignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const findEmail = await User.findOne({ email: email });
    if (findEmail) {
      res.status(409).json({
        success: false,
        message: "Email already exists, Please Login"
      });
    } else {
      bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
          res.status(500).json({ success: false, error: err });
        } else {
          const userCreds = new User({
            name,
            email,
            password: hash
          });
          const user = await userCreds.save();
          res.status(201).json({
            success: true,
            message: "Acount Created Successfully"
          });
        }
      });
    }
  } catch (error) {
    res.json({ success: false, message: "some error occured" });
  }
};

exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email: email });
    if (!foundUser) {
      return res.status(401).json({
        success: false,
        message: "Email Doesn't Exist, Create An Account!"
      });
    }

    bcrypt.compare(password, foundUser.password, (err, result) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "Authentication Failed"
        });
      }
      if (result) {
        const token = jwt.sign(
          { email: foundUser.email, userId: foundUser._id },
          process.env.JWT_KEY,
          { expiresIn: "24h" }
        );

        const user = {
          token,
          name: foundUser.name,
          _id: foundUser._id
        };

        return res
          .status(200)
          .json({ success: true, message: "Auth Successful", user });
      }

      res
        .status(401)
        .json({ success: false, message: "Password is Incorrect !" });
    });
  } catch (error) {
    res.status(401).json({ success: false, message: "Authentication Failed" });
  }
};

exports.loginUser;
