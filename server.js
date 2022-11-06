const express=require("express")
var cors = require('cors')
const { task_user } = require("./Routes/TaskUser.route")
const {connection}=require("./config/db")
const { task } = require("./Routes/Tasks.route")
require("dotenv").config()
const app=express()

app.use(express.json())
app.use(cors())
app.get("/",(req,res)=>{
    res.send("Welcome to home page")
})

app.use("/",task_user)
app.use("/",task)

app.listen(process.env.PORT,async()=>{

    try{
        await connection
        console.log("DB connected")
    }
    catch(err){
        console.log("Something wrong")
        console.log(err)
    }
    console.log(`listing port number ${process.env.PORT}`)
})