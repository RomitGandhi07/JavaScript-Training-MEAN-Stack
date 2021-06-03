const mongoose = require('mongoose');
const Joi = require('joi');

// Create Schema
const nameSchema=mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please enter the first name with min length of 3"],
        minlength: 3
    },
    lastName: {
        type: String,
        required: [true, "Please enter the last name with min length of 3"],
        minlength: 3
    }
});

// Create model 
const Name = mongoose.model('Name', nameSchema);

// This function is responsible for validating the name 
const validateName=(name)=>{
    const schema=Joi.object({
        firstName: Joi.string().trim().min(3).required(),
        lastName: Joi.string().trim().min(3).required()
    });
    return schema.validate(name);
}

module.exports.Name=Name;
module.exports.validate=validateName;