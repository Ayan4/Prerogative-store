const express = require("express");
const router = express.Router();
const { getUsers, userSignUp, userLogin } = require("../controllers/user");

router.get("/", getUsers);
router.post("/signup", userSignUp);
router.post("/login", userLogin);

module.exports = router;
