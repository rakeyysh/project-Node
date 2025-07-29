
const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");

const { connectMongoDB } = require("./connections");
const userRouter = require("./routes/user");
const { logReqRes }  = require("./middlewares");







const app = express();
const PORT = 8000;

// Connections
connectMongoDB("mongodb://127.0.0.1:27017/youtube-app-1");



//MiddleWare - plugin
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(logReqRes("log.txt"));


//Routes
app.use("/api/user",userRouter);



app.listen(PORT, () => {
    console.log(`Server Started at PORT :${PORT}`);
})