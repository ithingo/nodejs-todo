const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// collection && schema
let Todo = new Schema({
  text: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now
  }
}, {
  collection: 'todos'
});

module.exports = mongoose.model('Todo', Todo);