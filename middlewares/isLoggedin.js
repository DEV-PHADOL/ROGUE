const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model');

module.exports = async (req,res,next)=>{
    if(!req.cookie.token){
        req.flash('error',"You need to Login First");
        return res.redirect('/');
    }
    try{
        let decode = jwt.verify(req.cookie.token,process.env.JWT_KEY);
        let user = await userModel
        .findOne({ email : decode.email })
        .select('-password');

        req.user = user;
        next();
    }catch(err){
        req.flash('error',"Something went WRONG");
        return res.redirect('/');        
    }
}