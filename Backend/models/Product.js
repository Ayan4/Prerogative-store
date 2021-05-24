const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: true
    },

    name: {
      type: String,
      required: true
    },

    fastDelivery: Boolean,
    inStock: Boolean,

    price: {
      type: Number,
      required: true
    },

    selectedSize: {
      type: "string",
      required: true,
      default: "S"
    },

    image: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Products", schema);
