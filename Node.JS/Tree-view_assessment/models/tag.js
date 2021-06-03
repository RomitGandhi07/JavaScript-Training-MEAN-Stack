const mongoose = require('mongoose');
// const Joi = require('joi');

// Create Schema
const tagSchema=mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter tag"],
        minlength: 3
    },
    parent_id: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
    },
    children: [{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tag',
        },
        name: String
    }]
});

// Create model 
const Tag = mongoose.model('Tag', tagSchema);

// // This function is responsible for validating the name 
// const validateUser=(user)=>{
//     const schema=Joi.object({
//         name: Joi.string().trim().min(3).required(),
//         email: Joi.string().email().required(),
//         password: Joi.string().trim().min(5).required()
//     });
//     return schema.validate(user);
// }

module.exports.Tag=Tag;
// module.exports.validate=validateUser;