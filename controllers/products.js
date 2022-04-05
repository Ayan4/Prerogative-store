const Product = require("../models/Product");
const { extend } = require("lodash");

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    const productUpdates = req.body;
    product = extend(product, productUpdates);
    const response = await product.save();
    res.status(200).json({ success: true, response });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, err, message: "Cannot select size" });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
};
