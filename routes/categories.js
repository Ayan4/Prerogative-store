const express = require("express");
const router = express.Router();
const { getCategories, createCategory } = require("../controllers/categories");

router.get("/", getCategories);
router.post("/", createCategory);

module.exports = router;
