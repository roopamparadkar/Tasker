const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const {registerValidation, loginValidation} = require('../validation');
const { json } = require('express');

//  Register
router.post('/register', async (req, res) => {

    // Validating Data
    const {error} = registerValidation(req.body);

    if(error) return res.status(400).send(error.details[0].message);
    
    // Check if the user is already registered

    const emailExist = await User.findOne({email:req.body.email});
    if(emailExist) return res.status(400).send('User Already Registered!');

    // Hash Password

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password,salt);
    
    
    // Create new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    try {
        const savedUser = await user.save();
        res.send({user:user._id});
    } catch (err) {
        res.status(400).send(err);
    }
})

// Login
router.post('/login',async (req,res) => {

    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // Check if the user is registered

    const user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send('User is not Registered!');
    
    // Validate Password
    const validatePassword = await bcrypt.compare(req.body.password,user.password);
    if(!validatePassword) return res.status(400).send('Password Incorrect');

    // Generate JWT
    const token = jwt.sign({_id:user._id,email:user.email},process.env.TOKEN_SECRET);
    res.header('access_token',token).send({token,user});
})

module.exports = router;