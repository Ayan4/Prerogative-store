const express = require("express");
const { createCart, getProduct } = require("../middleware/param");
const router = express.Router();
const { authToken } = require("../middleware/verifyAuth");
const {
  getCart,
  addToCart,
  updateCart,
  deleteCart
} = require("../controllers/cart");

router.use("/", authToken);
router.use("/", createCart);
router.param("id", getProduct);

router.get("/", getCart);
router.post("/:id", addToCart);
router.patch("/:id", updateCart);
router.delete("/:id", deleteCart);

module.exports = router;
