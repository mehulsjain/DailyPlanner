require("dotenv").config()
const express = require("express")
const connectToDB = require("./config/db")
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

//custom middleware
const auth = require('./middleware/auth.js')

//import model - user
const User = require("./model/user")

const app = express()
const todoRouter = require("./route/todoRoute")
const cors = require('cors')

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

connectToDB();
app.use("/",todoRouter)

app.post("/register", async (req, res) => {
    try {
        
        //collect all info
        const {firstname, lastname, email, password} = req.body;   
        
        //validate the data, if exists
        if(!(email && password && lastname && firstname)){
            res.status(401).send("All fields are required")
        }
        
        //check if user exists or not
        const existingUser = await User.findOne({email})

        if(existingUser) {
            res.status(401).send("User already registered")
        }

        // excrypt the password
        const myEncPassword = await bcrypt.hash(password, 10)

        //create new entry in database
        const user = await User.create({
            firstname,
            lastname,
            email,
            password: myEncPassword
        })

        //create a token and send it to user
        const token = jwt.sign({
            id: user._id, email
        }, 'shhhh', {expiresIn: '2h'})

        user.token = token
        // dont want to send the password
        user.password = undefined

        res.status(201).json(user)

    } catch (error) {
        console.log(error);
        console.log("Error is response route")
    }
})

app.post("/login", async (req, res) => {
    try {
        //collect info from frontend
        const {email, password} = req.body
        //validate
        if(!(email && password)){
            res.status(401).send("Email and password required")
        }
        // check user in db
        const user = await User.findOne({email})
        // if user not exists
        //match the password
        if(user && (await bcrypt.compare(password, user.password))){
            const token = jwt.sign({id: user._id}, 'shhhhh', {expiresIn: '2h'})
            user.password = undefined
            user.token = token

            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly: true
            }
            res.status(299).cookie("token", token, options).json({
                success: true,
                token,
                user
            })
        }
        //create token and send
        res.sendStatus(400).send("email or password is incorrect")
    } catch (error) {
        console.log(error)
    }
})

app.get("/dashboard", auth, (req, res) => {
    
    //auth.js is the middleware to verify token

    // extract id from token and query the db

    res.send('Welcome to dashboard')
})

app.get("/profile", auth, async (req, res) => {
    //access to req.user = id, email

    //based on id, query to db and get all info of user - findOne({id})
    const id = req.decodedUser
    console.log("app:" + id)
    const verifiedUser = await User.findOne({_id:id})
    console.log(verifiedUser)
    //send a json response with all data
    res.send(verifiedUser)
})

module.exports = app;