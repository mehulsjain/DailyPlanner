require("dotenv").config()
const express = require("express")
const connectToDB = require("./config/db")
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

//custom middleware
const auth = require('./middleware/auth.js')

const app = express()
const todoRouter = require("./route/todoRoute")
const userRouter = require("./route/userRoute")
const cors = require('cors')

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

connectToDB();

app.use("/",userRouter)

app.use("/",todoRouter)

module.exports = app;