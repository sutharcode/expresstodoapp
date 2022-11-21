const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "TODOSAPI";





router
  .post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({email:email});
        if(!existingUser){
            return res.status(404).json({message : "User not found"})
        }
        const matchPassword = await bcrypt.compare(password, existingUser.password);
        if(!matchPassword){
            return res.status(400).json({message : "Invalid Credentials"})
        }

        const token = jwt.sign({email : existingUser.email, id : existingUser._id }, SECRET_KEY)
        //res.status(201).json({User: existingUser, token:token})
        res.redirect("/todo");

    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Something went wrong"});
    }
    
  })


  .post("/register", async (req, res) => {
    const { email, password } = req.body;

    try {
        // check for missing filds
        if (!email || !password) return res.send("Please enter all the fields");
        const doesUserExitsAlreay = await User.findOne({ email });

        if (doesUserExitsAlreay) return res.send("A user with that email already exits please try another one!");

        // lets hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        const latestUser = await User.create({
            email : email,
            password : hashedPassword
        });

        const token = jwt.sign({email : latestUser.email, id : latestUser._id }, SECRET_KEY);
        
          //res.status(201).send({User: latestUser, token:token})
          res.redirect("/")
               
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }

   });


module.exports = router;