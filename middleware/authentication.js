const jwt=require("jsonwebtoken");
require("dotenv").config()
const authentication=(req,res,next)=>{

    const token=req.headers.authorization.split(" ")[1];

    jwt.verify(token, `${process.env.JWT_SECRET_KEY}`, function(err, decoded) {
        
        if(err){
            res.send({"massage":"Something went wrong login again"})
        }
        else{
            let {user_id}=decoded;
            req.body.user_id=user_id;
            next()

        }
    });
}
module.exports={
    authentication
}