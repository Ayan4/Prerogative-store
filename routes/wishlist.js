const express = require("express");
const { createWishlist, getProduct } = require("../middleware/param");
const router = express.Router();
const { authToken } = require("../middleware/verifyAuth");
const {
  getWishlist,
  addToWishlist,
  deleteWishlist
} = require("../controllers/wishlist");

router.use("/", authToken);
router.use("/", createWishlist);
router.param("id", getProduct);

router.get("/", getWishlist);
router.post("/:id", addToWishlist);
router.delete("/:id", deleteWishlist);

module.exports = router;
