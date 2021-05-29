const express = require('express');
const {createCart, getProduct} = require('../middleware/param');
const router = express.Router();
const {extend} = require('lodash');

router.param("userId", createCart);
router.param("id", getProduct);

// get all cart products
router.get('/:userId', async (req, res) => {
  try{
    let cart = req.cart;
    cart = await cart.populate('cartItems.product').execPopulate();
    res.json({success: true, cart});
  }catch(err){
    res.json({status: false, msg: 'failed to fetch cart items'})
  }
});

// add items to cart
router.post('/:userId/:id', async (req, res) => {
  try{
    let cart = req.cart;
    const product = req.product;

    if(cart.cartItems.id(product._id)){
      res.status(400).json({success: false, message: 'Item Already existis in cart'});
      return;
    }
    cart = extend(cart, {cartItems: [...cart.cartItems, {
      _id: product._id,
      product: product._id
    }]});

    cart = await cart.save();
    cart = await cart.populate('cartItems.product').execPopulate();
    res.status(200).json({success: true, response: cart});
  }catch(err){
    res.status(400).json({success: false, msg: 'failed to add item to cart'})
  }
});

// update cart item
router.patch('/:userId/:id', async (req, res) => {
  try{
  let cart = req.cart;
  const product = req.product;

  let cartItem = cart.cartItems.id(product._id);
  const productUpdates = req.body;

  extend(cartItem, productUpdates);

  cart = await cart.save();
  cart = await cart.populate('cartItems.product').execPopulate();

  res.json({success: true, cart});
  }catch(error){
    res.json({success: 'failed', msg: 'could not update product'})
  }
})

// delete one item
router.delete('/:userId/:id', async (req, res) => {
  try{
    let cart = req.cart;
    const product = req.product;

    await cart.cartItems.id(product._id).remove();
    await cart.save();
    res.status(200).json({success: true, msg: "item deleted"});
  }catch(err){
    res.status(400).json({success: false, msg: "item not deleted"})
  }
})

module.exports = router;