const { User, validate } = require("../models/user");
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// This function is responsible for checking that email id is already present or not
async function alreadyExist(email){
    // Query the the database and check any user with given email is there or not
    const noOfUsers=await User.find({email}).select('email').count();
    if(noOfUsers > 0){
        return true;
    }
    return false;
}

router.post("/", async (req, res) => {
    try {
        // Validating the input given by the user
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        // Check if email id is already exist or not
        const isExist=await alreadyExist(req.body.email);
        if(isExist){
            return res.status(400).send("Email id already exist...");
        }

        // Encrypt the password
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);

        // Save user in the database and send that in the response
        let user = new User(
            {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
        user = await user.save();

        // Save details
        req.session.name=user.name;
        
        res.json(user);
    }
    catch (err){
        res.send(500).send(err);
    }

})

module.exports = router;