
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");


const Authenticate=async (req,res,next) => {
    try{
        const token=req.cookies.jwtoken;
       
        const verify= jwt.verify(token,process.env.SECRET_KEY);
        const rootUser = await User.findOne({_id:verify._id,"tokens.token":token});
        
        if(!User){
            throw new Error("user not found ")
        }
        req.token=token;
        req.rootUser=rootUser;
        req.userId=rootUser._id;
        next();
    }catch(err){
        console.log(err+ " in authenticate");
        res.status(401).send("unauthorized :no token there");
    }

}
module.exports=Authenticate;