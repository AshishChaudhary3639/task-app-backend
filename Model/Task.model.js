const mongoose=require("mongoose")


const taskSchema=new mongoose.Schema({
    title:{type:String,required:true},
    status:{type:Boolean,required:true},
    user_id:{type:String,required:true}
})

const TaskModel=mongoose.model("task",taskSchema)

module.exports={
    TaskModel
}