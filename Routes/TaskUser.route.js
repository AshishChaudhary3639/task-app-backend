const {Router}=require("express")
const bcrypt=require("bcrypt");
require("dotenv").config()
const jwt=require("jsonwebtoken")
const { TaskUserModel } = require("../Model/TaskUser");
const task_user=Router()


task_user.post("/signup",async(req,res)=>{
    const {email,password}=req.body;
    const isUser=await TaskUserModel.findOne({email})
    if(isUser){
        console.log(isUser)
        res.send({massage:"User already exist try to login"})
    }
    else{
        bcrypt.hash(password, 4, async(err,hashed_password)=>{
            
            const user=new TaskUserModel({
                email:email,
                password:hashed_password
            })
            try{
                await user.save()
                res.send({massage:"User Signup successful"})
            }
            catch(err){
                res.send({massage:"Signup failed try after some time"})

            }
        })
    }
})

task_user.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    const user=await TaskUserModel.findOne({email})
    let user_id=user._id;
    const hashed_password=user.password;
    bcrypt.compare(password, hashed_password, function(err, result){

        if(err){
            res.send({"massage":"Something wrong try after some time"})
        }
        else if(result){
            const token=jwt.sign({ user_id }, `${process.env.JWT_SECRET_KEY}`)
            res.send({"token":token})
        }
        else{
            res.send({"massage": "something wrong"})
        }
    })
})





module.exports={
    task_user
}

