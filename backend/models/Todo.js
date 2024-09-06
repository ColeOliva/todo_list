const mongoose = require('mongoose');

// define the schema
const TodoSchema = new mongoose.Schema({
  item: String,
  completed: Boolean,
});

// define the model
const Todo = mongoose.model('Todo', TodoSchema);
module.exports = {Todo, TodoSchema};