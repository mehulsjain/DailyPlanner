const mongoose = require("mongoose")

const connectToDB = () => {
    mongoose.connect(process.env.MONGO_URI)
    .then((conn) => {
        console.log(`Connected DC: ${conn.connection.host}`)
    })
    .catch((error) => {
        console.log(error.message)
        process.exit(1)
    })
}

module.exports = connectToDB;