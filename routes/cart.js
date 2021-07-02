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
// router.param("userId", createCart);
router.use("/", createCart);
router.param("id", getProduct);

// router.get("/:userId", getCart);
router.get("/", getCart);
// router.post("/:userId/:id", addToCart);
router.post("/:id", addToCart);
// router.patch("/:userId/:id", updateCart);
router.patch("/:id", updateCart);
// router.delete("/:userId/:id", deleteCart);
router.delete("/:id", deleteCart);

module.exports = router;
