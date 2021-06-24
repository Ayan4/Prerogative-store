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

router.param("userId", createCart);
router.param("id", getProduct);
router.use("/", authToken);

router.get("/:userId", getCart);
router.post("/:userId/:id", addToCart);
router.patch("/:userId/:id", updateCart);
router.delete("/:userId/:id", deleteCart);

module.exports = router;
