const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
let bodyParser=require('body-parser');


// connect to mongodb
mongoose.connect('mongodb+srv://mahesh:Password%23456@cluster0.kbk35.mongodb.net/ToDoDB?retryWrites=true&w=majority')//here we gave reader db

const app = express()


// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json())
app.use(express.static("public"));
app.set("view engine", "ejs");




//routes

app.use(require("./routes/index"))
app.use(require("./routes/todo"))
app.use(require("./routes/user"))




/// server configuration

app.listen(3000,()=>console.log("server running at 3000"))