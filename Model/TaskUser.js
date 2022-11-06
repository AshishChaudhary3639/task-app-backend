const mongoose=require("mongoose")

const taskUserSchema=new mongoose.Schema({
    email:{type:String,required:true},
    password:{type:String,required:true},
    role:{type:String,enum:["user"],default:"user"}
})


const TaskUserModel=mongoose.model("task_user",taskUserSchema)

module.exports={
    TaskUserModel
}