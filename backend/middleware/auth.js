const jwt = require("jsonwebtoken")

const auth = async (req, res, next) => {
    // console.log(req.cookies)
    const token = req.cookies.token
    //Authorization: "Bearer longtokenvalue"
    //const token = req.header("Authorization").replace("Bearer ", "")

    //if token is not here 
    if(!token){
        return res.status(403).send('token is missing')
    }

    // verify token
    try {
        const decode = await jwt.verify(token, process.env.JWT_TOKEN)
        // console.log(decode.id)
        const options = {
            expires: new Date(Date.now() + 3*24*60*60*1000),
            httpOnly: true
        }
        res.cookie("userId", decode.id, options)
    } catch (error) {
        res.status(403).send('token is invalid')
    }

    return next()
}

module.exports = auth