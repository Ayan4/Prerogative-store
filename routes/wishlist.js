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
// router.param("userId", createWishlist);
router.use("/", createWishlist);
router.param("id", getProduct);

// router.get("/:userId", getWishlist);
router.get("/", getWishlist);
// router.post("/:userId/:id", addToWishlist);
router.post("/:id", addToWishlist);
// router.delete("/:userId/:id", deleteWishlist);
router.delete("/:id", deleteWishlist);

module.exports = router;
