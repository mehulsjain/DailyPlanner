//Logic

const cookieParser = require("cookie-parser");
const { SchemaTypeOptions, Query } = require("mongoose");
const Todo = require("../model/todoModel")

exports.home = (req, res) => {
    res.send("Hello Todo User");
}

exports.createTodo = async (req, res) => {
    try {
        const {title, tasks} = req.body
        const userId = req.cookies.userId
        console.log(req.body)
        if(!title){

            throw new Error("Title is required");
        }else if(tasks.length == 0){
            throw new Error("Tasks are required");
        }else if(!userId){
            throw new Error("userId is required");
        }

        const titleExists = await Todo.findOne({title});

        if(titleExists && titleExists.userId.toString()===userId){
            console.log("Title already exists For the user");
            
            res.status(401).json({
                error: "Please enter a unique title"
            });
            return;
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
        const userId =  req.userIdCookie;
        const todos = await Todo.find({userId})
        res.status(200).json({
            success: true,
            todos
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
            console.log(error.message);
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
        const {task_text} = req.body
        const todo = await Todo.findByIdAndUpdate(req.query.id, {$push: {tasks: task_text}})
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