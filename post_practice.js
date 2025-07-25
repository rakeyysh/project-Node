
const users = require("./MOCK_DATA.json");
const fs = require("fs");

const express = require("express");


const app = express();

const PORT = 4000;

//Middleware
app.use(express.urlencoded({ extended: true }));


app.post("/practice",(req,res)=>{

    console.log(req.body);
    const Body = req.body;

    users.push({id:users.length+1, ...Body});
    console.log(users);
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),()=>{
    return res.json("SUCCESS!");
    });
   


})

app.listen(PORT,()=>{
    console.log(`Server Started at ${PORT}`)
})