const express = require("express");
const { createWishlist, getProduct } = require("../middleware/param");
const router = express.Router();
const { authToken } = require("../middleware/verifyAuth");
const {
  getWishlist,
  addToWishlist,
  deleteWishlist
} = require("../contorllers/wishlist");

router.param("userId", createWishlist);
router.param("id", getProduct);
router.use("/", authToken);

router.get("/:userId", getWishlist);
router.post("/:userId/:id", addToWishlist);
router.delete("/:userId/:id", deleteWishlist);

module.exports = router;
