const express = require("express");
const router = express.Router();
const { getUsers, userSignUp, userLogin } = require("../contorllers/user");

router.get("/", getUsers);
router.post("/signup", userSignUp);
router.post("/login", userLogin);

module.exports = router;
