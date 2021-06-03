const mongoose = require('mongoose');
const Joi = require('joi');

// Create Schema
const userSchema=mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter name"],
        minlength: 3
    },
    email: {
        type: String,
        required: [true, "Please enter email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter the password"],
    }
});

// Create model 
const User = mongoose.model('User', userSchema);

// This function is responsible for validating the name 
const validateUser=(user)=>{
    const schema=Joi.object({
        name: Joi.string().trim().min(3).required(),
        email: Joi.string().email().required(),
        password: Joi.string().trim().min(5).required()
    });
    return schema.validate(user);
}

module.exports.User=User;
module.exports.validate=validateUser;