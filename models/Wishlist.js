const mongoose = require('mongoose');

const childSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Products'}
});

const wishlistSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, ref: "user"},

  wishlistItems: [childSchema]

}, {timestamps: true});

module.exports = mongoose.model('Wishlist', wishlistSchema);