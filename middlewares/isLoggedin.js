const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model');

module.exports = async (req,res,next)=>{
    if(!req.cookies.token){
        req.flash('error',"You need to Login First");
        return res.redirect('/');
    }
    try{
        let decode = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        let use = await userModel
            .findOne({ email : decode.email })
            .select("-password");
        req.user = use;
        next();
    }catch(err){
        req.flash('error',"Something went WRONG");
        res.redirect('/');        
    }
}