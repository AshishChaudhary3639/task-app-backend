const { Router } = require("express");
const { authentication } = require("../middleware/authentication");
const { TaskModel } = require("../Model/Task.model");
task = Router();

task.post("/create", authentication, async (req, res) => {
  const { title, status, user_id } = req.body;
  // console.log(user_id)
  try {
    let user = new TaskModel({
      title,
      status,
      user_id,
    });
    await user.save()
    res.send({"massage":"Task submited successful"})
  } catch (err) {
    res.send({ massage: "Something wrong try again" });
  }
});

task.get("/gettasks", authentication, async(req, res) => {
    const {user_id}=req.body;

    try{
        let data=await TaskModel.find({user_id})
        res.send(data)

    }
    catch(err){
        res.send({"massage":"We could not fetch the data"})
    }
});

task.put("/taskupdate/:_id",authentication,  async(req,res)=>{
    const data=req.body;

    try{
        await TaskModel.updateOne(req.params,{
            $set:data
        })
        res.send({"massage":"Data updated successfully"})

    }
    catch(err){
        res.send({"massage":"We could not updated"})
    }

})

task.delete("/taskdelete/:_id",authentication,  async(req,res)=>{

    try{
        await TaskModel.deleteOne(req.params)
        res.send({"massage":"Data deleted successfully"})

    }
    catch(err){
        console.log(err)
        res.send({"massage":"We could not delete"})
    }

})
module.exports = {
  task,
};
