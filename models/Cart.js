const mongoose = require('mongoose');

const childSchema = new mongoose.Schema({
  product: {type: mongoose.Schema.Types.ObjectId, ref: 'Products'},

  quantity: {type: Number, default: 1}
},
);

const cartSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, ref: "user"},

  cartItems: [childSchema]

}, {timestamps: true});

module.exports = mongoose.model('Cart', cartSchema);