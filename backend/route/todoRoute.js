const express = require("express");
const { home, createTodo, getTodos, deleteTodo, createTasks, deleteTasks, editTodoTitle, editTask } = require("../controllers/todoControllers");
const router = express.Router();

// All routes are working

router.get("/", home)
router.post("/createTodo", createTodo)
router.get("/getTodos", getTodos)
router.put("/editTodoTitle/:id", editTodoTitle)
router.delete("/deleteTodo/:id", deleteTodo)
router.put("/createTasks/:id", createTasks)
router.put("/deleteTasks/:id", deleteTasks)
router.put("/editTask/:id", editTask)

module.exports = router