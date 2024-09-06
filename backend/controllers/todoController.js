const {Todo} = require('../models/Todo');

// get all todo items: controller function
exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get a single todo item: controller function
// URI: /todos/:_id
exports.getSingleTodo = async (req, res) => {
  try {
    const todoId = req.params._id;
    const todo = await Todo.findById(todoId);
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// create a new todo item: controller function
exports.createTodo = async (req, res) => {
  try {
    const todo = req.body;
    const newTodo = new Todo(todo);
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update a todo item: controller function
// URI: /todos/:_id
exports.updateTodo = async (req, res) => {
  try {
    const todoId = req.params._id;
    const updatedTodo = req.body;

    const todo = await Todo.findByIdAndUpdate(todoId, updatedTodo, {
      new: true,
    });
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete a todo item: controller function
// URI: /todos/:_id
exports.deleteTodo = async (req, res) => {
  try {
    const todoId = req.params._id;
    await Todo.findByIdAndDelete(todoId);
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};