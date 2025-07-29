const fs = require("fs");

function logReqRes(filename){
   return (req,res,next)=>{
    
    fs.appendFile(filename,`${req.method} ${new Date()}\n`,(err,value)=>{
        console.log("file logged!");
        next();
    });

   
}}

module.exports = {
    logReqRes,
}