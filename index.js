
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const express = require("express");
const app = express();

//MiddleWare - plugin
app.use(express.urlencoded({extended:false}));

const PORT = 8000;


// REST APIs.
app.get("/users", (req, res) => {
    const html =
 `<ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")} 
    </ul>


 `

 
    return res.send(html);
})

app.get("/api/users", (req, res) => {
    res.setHeader("x-Company","TCSA");
    // always append x before your custome headers  for good practices.
    return res.json(users);
})


app.get("/users/:id",(req,res)=>{

    const id = Number(req.params.id);

    const userID = users.find((user) => user.id === id); 
    if(!userID) return res.status(404).json("user not found");
    return res.json(userID);
})


app.post("/api/users",(req,res)=>{

    // TODO: Create new user
   
    
    const body = req.body;
    if(!body.first_name || !body.last_name || !body.company) res.status(400).json({msg : "All fields required..."});
    console.log("Body",body);

    users.push({id:users.length+1,...body});

    
  fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
    return res.status(201).json({status:"SUCCESS!", id: users.length+1 });
  })
    

})


app.patch("/api/users/:id",(req,res)=>{

    // TODO: Edit the user with id
    return res.json({status:"pending"});

})


app.delete("/api/users/:id",(req,res)=>{

    //TODO : Delete the user with id
    return res.json({status:"pending"});
})



app.listen(PORT, () => {
    console.log(`Server Started at PORT :${PORT}`);
})