const { extend } = require("lodash");
const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// show all document
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({success: true, products});
  } catch (error) {
    res.send(error);
  }
});

// updating a document
router.post("/:id", async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    const productUpdates = req.body;
    product = extend(product, productUpdates);
    const response = await product.save();
    res.json({ success: true, response });
  } catch (err) {
    res.json({ success: false, err, message: "Cannot select size" });
  }
});

// Get a single document with id
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
