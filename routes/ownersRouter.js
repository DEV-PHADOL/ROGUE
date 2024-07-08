const express = require('express');
const router = express.Router();
const ownerModel = require('../models/owner-model');
require('dotenv').config();

if(process.env.NODE_ENV === "development"){
    router.post('/create',async (req,res)=>{
        let owner = await ownerModel.find();
        if(owner.length > 0){
            return res
            .send(503)
            .send("You don't have permission to create a new owner");
        }
        let{fullname,email,password}=req.body;
        let createdOwner = await ownerModel.create({
            fullname,
            email,
            password
        });
        res.status(201).send(createdOwner);
    });
}

router.get("/admin",(req,res)=>{
    let success = req.flash('success');
    res.render('createproducts',{ success });   
});

module.exports = router;