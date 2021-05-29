const Cart = require('../models/Cart');
const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');

exports.createCart = async (req, res, next, id) => {
  try{
    const cart = await Cart.findById(id);
    if(cart){
      req.cart = cart;
    }else{
      const newCart = await new Cart({
        _id: id
      })
      const saveCart = await newCart.save();
      req.cart = saveCart;
    }
    next();
  }catch(err){
    res.status(400).json({success: false, message: err.message});
  }
};

exports.createWishlist = async (req, res, next, id) => {
  try{
    const wishlist = await Wishlist.findById(id);
    if(wishlist){
      req.wishlist = wishlist;
    }else{
      const newWishlist = await new Wishlist({
        _id: id
      })
      const saveWishlist = await newWishlist.save();
      req.wishlist = saveWishlist;
    }
    next();
  }catch(err){
    res.status(400).json({success: false, message: err.message});
  }
};

exports.getProduct = async (req, res, next, id) => {
  try{
    const product = await Product.findById(id);
    req.product = product;
    next();
  }catch(err){
    res.status(400).json({success: false, message: err.message});
  }
}