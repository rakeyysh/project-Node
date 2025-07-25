const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const PORT = 8000;

const app = express();

// Middlewares

app.use(express.urlencoded({extended:false}));

app.use((req,res,next)=>{
    
    fs.appendFile("LOG.txt",`${req.method} ${new Date()}\n`,(err,value)=>{
        console.log("file logged!");
    });

    next();
})


app.post("/api/users",(req,res)=>{

    const body = req.body;
    console.log("Body",body);

    users.push({id:users.length+1,...body});

    
  fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
    return res.json({status:"SUCCESS!", id: users.length+1 });
  })
    

})

app.listen(PORT,()=>{
    console.log("SUCCESS from middleware.js");
})




