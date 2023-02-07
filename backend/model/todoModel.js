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
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
},
{
    timestamps: true
})

module.exports = mongoose.model("Todo", TodoSchema)