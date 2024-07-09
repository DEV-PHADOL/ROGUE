const userModel = require('../models/user-model');
const productModel = require('../models/product-model');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/generateToken');

module.exports.registerUser = async (req,res)=>{
    try{   
        let{email,password,fullname} = req.body;

        let user = await userModel.findOne({email:email});
        if(user){
            req.flash('error',"You already have an Account");
            return res.redirect('/');            
        } 

        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(password,salt,async (err, hash)=>{
                if(err) return res.send(err.message);
                else {
                    let user = await userModel.create({
                        fullname,
                        email,
                        password : hash,
                    });
                    let token = generateToken;
                    res.cookie("token",token);
                    res.send("user created successfully");
                }
            });
        });
    }
    catch(err){
        console.log(err.message);
    }
};

module.exports.loginUser = async (req,res)=>{
    let {email,password} = req.body;
    let user = await userModel.findOne({email:email});
    if(!user){
        req.flash('error',"Email or Password is incorrect");
        return res.redirect('/');
    } 

    bcrypt.compare(password,user.password, async (err,result)=>{
        if(result){
            let token = generateToken(user);
            res.cookie("token",token);
            let products = await productModel.find();
            res.render('shop',{products}); 
        }
        else{
            req.flash('error',"Email or Password is incorrect");
            return res.render('/');
        }
    })
};

module.exports.logOut = async (req,res)=>{
    res.cookie('token',"");
    res.redirect('/');
}