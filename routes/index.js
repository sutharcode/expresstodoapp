const router = require("express").Router();
const Todo = require("../models/Todo")

//routes

router.get("/", async(req, res)=>{
    res.render("index")
})

router.get("/register", (req, res)=>{
    res.render("register");
})

router.get("/todo", async (req, res)=>{
    const allTodo = await Todo.find();
    res.render("todo", {todo: allTodo});
})

module.exports = router;