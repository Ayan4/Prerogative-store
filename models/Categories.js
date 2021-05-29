const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true
  }
}, {timestamp: true});

module.exports = mongoose.model('Category', categoriesSchema);