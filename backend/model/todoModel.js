const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        require: [true, "Title is required"]
    },
    tasks: {
        type: [String],
        default: undefined
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        require: [true, "UserId is required"],
        ref:"user"
    }
},
{
    timestamps: true
})

module.exports = mongoose.model("Todo", TodoSchema)