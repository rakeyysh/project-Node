const mongoose = require("mongoose");


async function connectMongoDB(url) {

    return mongoose.connect(url).then(()=>{
        console.log("MongoDB connected");
    })
}

module.exports = {
    connectMongoDB,
}