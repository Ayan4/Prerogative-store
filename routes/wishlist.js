const express = require('express');
const {createWishlist, getProduct} = require('../middleware/param');
const router = express.Router();
const {extend} = require('lodash');

router.param("userId", createWishlist);
router.param("id", getProduct);

// get wishlist items
router.get('/:userId', async (req, res) => {
  try{
    let wishlist = req.wishlist;
    wishlist = await wishlist.populate('wishlistItems.product').execPopulate();
    res.status(200).json({success: true, wishlist});
  }catch(error){
    res.status(400).json({success: false, msg: 'failed to fetch wishlist items'})
  }
});

// add item to wishlist
router.post('/:userId/:id', async (req, res) => {
  try{
    let wishlist = req.wishlist;
    const product = req.product;

  if(wishlist.wishlistItems.id(product._id)){
        res.status(400).json({success: false, message: 'Item Already existis in wishlist'});
        return;
      }

  wishlist = extend(wishlist, {wishlistItems: [...wishlist.wishlistItems, {
    _id: product._id,
    product: product._id
  }]});

    wishlist = await wishlist.save();
    wishlist = await wishlist.populate('wishlistItems.product').execPopulate();
    res.status(200).json({success: true, wishlist});
  }catch(error){
    res.status(400).json({success: false, msg: 'failed to add item to wishlist'});
  }
});

// delete wishlist item
router.delete('/:userId/:id', async (req, res) => {
  try{
    let wishlist = req.wishlist;
    const product = req.product;

    await wishlist.wishlistItems.id(product._id).remove();
    await wishlist.save();
    res.status(200).json({success: true, msg: "item deleted"});
  }catch(err){
    res.status(400).json({success: false, msg: "item not deleted"})
  }
});

module.exports = router;