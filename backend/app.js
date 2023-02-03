require("dotenv").config()
const express = require("express")
const connectToDB = require("./config/db")
const app = express()
const todoRouter = require("./route/todoRoute")
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

connectToDB();
app.use("/",todoRouter)

module.exports = app;