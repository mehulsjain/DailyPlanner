const express = require("express");
const { home, createTodo, getTodos, deleteTodo, createTasks, deleteTasks, editTodoTitle, editTask } = require("../controllers/todoControllers");
const auth = require("../middleware/auth");
const router = express.Router();

router.use('/getTodos', auth)

//Todo - CRUD
router.get("/", home)
router.post("/createTodo", createTodo)
router.get("/getTodos", getTodos)
router.put("/editTodoTitle", editTodoTitle)
router.delete("/deleteTodo", deleteTodo)

//Tasks - CRUD
router.put("/createTask", createTasks)
router.put("/deleteTask", deleteTasks)
router.put("/editTask", editTask)

module.exports = router