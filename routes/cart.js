const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const { extend } = require("lodash");
// const checkAuth = require("../middleware/checkAuth");

// get all cart products
router.get("/", async (req, res) => {
  try {
    const cart = await Cart.find({}).populate("product");
    res.json({ success: true, cart });
  } catch (err) {
    res.json({ status: false, msg: "failed to fetch cart items" });
  }
});

// add items to cart
router.post("/:id", async (req, res) => {
  try {
    const cartItem = new Cart({
      product: req.params.id
    });
    const response = await cartItem.save();
    const product = await response.populate("product").execPopulate();
    res.json({ success: true, product });
  } catch (err) {
    res.json({ success: false, msg: "failed to add item to cart" });
  }
});

// show one item only
router.get("/:id", async (req, res) => {
  try {
    const foundProduct = await Cart.findById(req.params.id).populate("product");
    res.status(200).json({ success: true, cartItem: foundProduct });
  } catch (err) {
    res.status(500).json({ success: false, msg: "product not found" });
  }
});

// update cart item
router.patch("/:id", async (req, res) => {
  try {
    let cartItem = await Cart.findById(req.params.id).populate("product");
    const productUpdates = req.body;
    cartItem = extend(cartItem, productUpdates);
    const product = await cartItem.save();
    res.json({ success: true, product });
  } catch (error) {
    res.json({ success: "failed", msg: "could not update product" });
  }
});

// delete one item
router.delete("/:id", async (req, res) => {
  try {
    const foundProduct = await Cart.findById(req.params.id);
    foundProduct.remove();
    res.status(200).json({ success: true, msg: "item deleted" });
  } catch (err) {
    res.status(500).json({ success: false, msg: "item not deleted" });
  }
});

module.exports = router;
