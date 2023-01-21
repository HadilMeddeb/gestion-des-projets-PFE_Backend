const jwt = require("jsonwebtoken");
const User = require("../Models/User");

exports.isAdmin = async (req, res, next) => {
 try
 { 
    let token = res.token;
    console.log("from is Admin",token);
    const verified = jwt.verify(token, process.env.JWT_SECRET);
   
  console.log("****************",verified._id);
  
    user=await User.findById(verified._id)
    console.log("****************",user);
   
    if(user)
    {
        if(user.role=="Admin")
        {
            console.log("user.role :",user.role,"its admin");
            res.token=token;
            next();
        }
        else
        {
            res.status(400).send({message:"not authorized only for admin"});
        }
    }
    else
    {
        res.status(400).send({message:"no user with this Token"});
    }
 }
 catch(error)
 {
    res.status(400).send({ message: "invalid Token" });
 }

};