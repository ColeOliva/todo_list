const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

// get all todo items
router.get('/', todoController.getAllTodos);

// get a single todo item
router.get('/:_id', todoController.getSingleTodo);

// create a new todo item
router.post('/', todoController.createTodo);

// update a todo item
router.patch('/:_id', todoController.updateTodo);

// delete a todo item
router.delete('/:_id', todoController.deleteTodo);

module.exports = router;
