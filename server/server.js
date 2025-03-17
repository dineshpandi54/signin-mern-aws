const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
const registerModel = require('./models/User')
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors())

mongoose.connect('mongodb+srv://admin:admin12345@cluster0.56fju.mongodb.net/registerList?retryWrites=true&w=majority&appName=Cluster0')

app.post('/register',(req,res) => {
    registerModel.create(req.body)
    .then(registers => res.json(registers))
    .catch(err => res.json(err))
})

app.post('/login',(req,res)=>{
    const{email,password} = req.body;
    registerModel.findOne({email:email})
    .then(user=>{
        if(user){
            if(user.password === password){
                res.json("success")
            }else{
                res.json("The password is incorrect")
            }
        }else{
            res.json("User not found")
        }
    })
})


app.post('/home',(req,res) => {
    registerModel.create(req.body)
    .then(registers => res.json(registers))
    .catch(err => res.json(err))
})
  

app.use(express.static(path.join(__dirname, "signup/build")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "signup/build", "index.html"));
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
 