const { User, validate } = require("../models/user");
const express = require('express');
const router = express.Router();
const mongoose= require("mongoose");
const bcrypt=require('bcrypt');


router.post("/", async (req, res) => {
    // Validating the input given by the user
    if(!req.body.email || !req.body.password){
        return res.status(400).send("Please enter all the fields...");
    }

    // Check that given user 
    const user=await User.findOne({email: req.body.email}).select('name email password');
    if(!user){
        return res.status(400).send("Accout with Given id not found...");
    }

    // Check password is valid or not
    const isValidPassword=await bcrypt.compare(req.body.password,user.password);
    if(!isValidPassword){return res.status(400).send("Please Enter Valid Password");}

    // Save details
    req.session.name=user.name;

    // send response
    res.send(user);

})

module.exports = router;