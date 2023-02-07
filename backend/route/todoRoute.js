const express = require("express");
const { home, createTodo, getTodos, deleteTodo, createTasks, deleteTasks, editTodoTitle, editTask } = require("../controllers/todoControllers");
const auth = require("../middleware/auth");
const router = express.Router();

router.use('/getTodos', auth)

//Todo - CRUD
router.get("/", home)
router.post("/createTodo", createTodo)
router.get("/getTodos", getTodos)
router.put("/editTodoTitle/:id", editTodoTitle)
router.delete("/deleteTodo/:id", deleteTodo)

//Tasks - CRUD
router.put("/createTasks/:id", createTasks)
router.put("/deleteTasks/:id", deleteTasks)
router.put("/editTask/:id", editTask)

module.exports = router