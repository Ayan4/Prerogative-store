const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  category: {
    type: String,
    required: true
  }
}, {timestamp: true});

module.exports = mongoose.model('Category', schema);