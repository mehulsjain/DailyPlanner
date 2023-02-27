//Logic

const cookieParser = require("cookie-parser");
const { SchemaTypeOptions, Query } = require("mongoose");
const Todo = require("../model/todoModel")

exports.home = (req, res) => {
    res.send("Hello Todo User");
}

exports.createTodo = async (req, res) => {
    try {
        const {title, tasks, userId} = req.body
        console.log(req.body)
        if(!title || tasks.length == 0){
            throw new Error("Title and tasks are required");
        }
        const titleExists = await Todo.findOne({title});
        if(titleExists){
            console.log("Title already exists");
            res.status(401).json({
                error: "title already exists"
            })
            process.exit(1)
        }

        const todo = await Todo.create({title, tasks, userId});
        res.status(201).json({
            success: true,
            message: "Todo created successfully",
            todo,
        })
    } catch (error) {
        console.log(error);
    }
}

exports.getTodos = async (req, res) => {
    try {
        const userId = req.cookies.userId
        const todos = await Todo.find({userId})
        res.status(200).json({
            success: true,
            todos,
        });
    } catch (error) {
        console.log(error)
        res.status(401).json({
            success: false,
            error: error.message,

        })
    }
}

// exports.getTodo = async (req, res) => {

// }

exports.editTodoTitle = async (req, res) => {
    try {
        const {title} = req.body
        const todo = await Todo.findByIdAndUpdate(req.query.id,
            {
                "title": title
            }
        ).catch ((error) => {
            console.log(error);
            res.status(401).json({
                success: false,
                message: error.message,
            })
        });
        res.status(200).json({
            success: true,
            message: "Todo updated successfully",
        })
    } catch (error) {
        console.log(error);
        res.status(401).json({
            success: false,
            message: error.message,
    })
    }
}

exports.deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.query.id);
        res.status(200).json({
            success: true,
            message: "Todo deleted successfully",
        })
    } catch (error) {
        console.log(error);
        res.status(401).json({
            success: false,
            message: error.message,
    })
    }
}

exports.createTasks = async (req, res) => {
    try {
        const {task} = req.body
        const todo = await Todo.findByIdAndUpdate(req.query.id, {$push: {tasks: task}})
        res.status(200).json({
            success: true,
            message: "Task added successfully",
            todo
        })
    } catch (error) {
        console.log(error)
        res.status(401).json({
            success: false,
            message: error.message,
        })
    }
}

exports.editTask = async (req, res) => {
    try {
        const {task_text, task_new_text} = req.body
        const todo = await Todo.findByIdAndUpdate(
            req.query.id, {
                $set: {
                    "tasks.$[element]": task_new_text
                }
            },{
                arrayFilters: [{element:task_text}]
            })
            res.status(200).json({
            success: true,
            message: "Task Updated successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(401).json({
            success: false,
            message: error.message,
        })
    }
}

exports.deleteTasks = async (req, res) => {
    try {
        const {task_text} = req.body
        const todo = await Todo.findByIdAndUpdate(
            req.query.id, 
            {
                $pull: { tasks : task_text}
            })
        res.status(200).json({
            success: true,
            message: "Task deleted successfully",
            task_text,
            todo
            
        })
    } catch (error) {
        console.log(error)
        res.status(401).json({
            success: false,
            message: error.message,
        })
    }
}