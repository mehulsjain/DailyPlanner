const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {
    console.log(req.cookies)
    const token = req.cookies.token
    //Authorization: "Bearer longtokenvalue"
    //const token = req.header("Authorization").replace("Bearer ", "")

    //if token is not t here 
    if(!token){
        return res.status(403).send('token is missing')
    }

    // verify token
    try {
        const decode = jwt.verify(token, 'shhhhh')
        console.log(decode.id)
        req.decodedUser = decode.id
    } catch (error) {
        res.status(403).send('token is invalid')
    }

    return next()
}

module.exports = auth