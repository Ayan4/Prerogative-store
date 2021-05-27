const express = require("express");
const router = express.Router();
const Wishlist = require("../models/Wishlist");

// get wishlist items
router.get("/", async (req, res) => {
  try {
    const response = await Wishlist.find({}).populate("product");
    res.json({ success: true, wishlist: response });
  } catch (error) {
    res.json({ success: false, msg: "failed to fetch wishlist items" });
  }
});

// add item to wishlist
router.post("/:id", async (req, res) => {
  try {
    const wishlistItem = new Wishlist({
      product: req.params.id
    });
    const response = await wishlistItem.save();
    const product = await response.populate("product").execPopulate();
    res.json({ success: true, wishlistItem: product });
  } catch (error) {
    res.json({ success: false, msg: "failed to add item to wishlist" });
  }
});

// delete wishlist item
router.delete("/:id", async (req, res) => {
  try {
    const response = await Wishlist.findById(req.params.id);
    response.remove();
    res.status(200).json({ success: true, msg: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, msg: "couldn't delete item" });
  }
});

module.exports = router;
