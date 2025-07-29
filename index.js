
const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");





const { timeStamp } = require("console");


const app = express();
const PORT = 8000;

//Connection
mongoose
    .connect("mongodb://127.0.0.1:27017/youtube-app-1")  // returns a promise
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("Mongo Error", err));

//Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    jobTitle: {
        type: String,
    },
    gender: {
        type: String,
    },

}, {
    timestamps: true
})

// Model
const User = mongoose.model("user", userSchema);
console.log(User);


//MiddleWare - plugin
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// REST APIs.
app.get("/users", async (req, res) => {

    const allDbUsers = await User.find({});
    const html =
        `<ul>
    ${allDbUsers.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join("")} 
    </ul>


 `


    return res.send(html);
})

app.get("/api/users", async (req, res) => {
    const allDbUsers = await User.find({});
    res.setHeader("x-Company", "TCSA");
    // always append x before your custome headers  for good practices.
    return res.json(allDbUsers);
})


app.get("/api/users/:id", async (req, res) => {

    console.log(req.params.id);
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json("user not found");
    return res.json(user);
})


app.post("/api/users", async (req, res) => {

    // TODO: Create new user


    const body = req.body;
    if (!body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) res.status(400).json({ msg: "All fields required..." });
    console.log("Body", body);

    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title,
    });

    console.log(result);

    return res.status(201).json({ msg: "success" });


})


app.patch("/api/users/:id", async (req, res) => {

    // TODO: Edit the user with id
    await User.findByIdAndUpdate(req.params.id, { lastName: 'Changed' });
    return res.json({ status: "Success" });

})


app.delete("/api/users/:id", async (req, res) => {

    //TODO : Delete the user with id
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: "success" });
})



app.listen(PORT, () => {
    console.log(`Server Started at PORT :${PORT}`);
})