const express = require('express');
const router = express.Router();
const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/generateToken');
const { registerUser, loginUser, logOut } = require('../controllers/authController');

router.get('/',(req,res)=>{
    res.send("hey");
});

router.post('/register',registerUser);

router.post('/login',loginUser)

router.get('/logout',logOut);

module.exports = router;