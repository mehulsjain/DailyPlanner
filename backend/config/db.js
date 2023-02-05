const mongoose = require('mongoose');

const MONGODB_URL = process.env.MONGO_URI

const connectToDB = () => {
    mongoose.connect(MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((conn) => {
                console.log(`Connected DC: ${conn.connection.host}`)
            })
    .catch((error) => {
        console.log("DB Connection failed");
        console.log(error.message);
        process.exit(1);
    })
}

module.exports = connectToDB;

// const mongoose = require("mongoose")

// const connectToDB = () => {
//     mongoose.connect(process.env.MONGO_URI)
//     .then((conn) => {
//         console.log(`Connected DC: ${conn.connection.host}`)
//     })
//     .catch((error) => {
//         console.log(error.message)
//         process.exit(1)
//     })
// }

// module.exports = connectToDB;