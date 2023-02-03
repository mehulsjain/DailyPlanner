const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        require: [true, "Title is required"],
        unique: true
    },
    tasks: {
        type: [String],
        default: undefined
    }
})

module.exports = mongoose.model("Todo", TodoSchema)