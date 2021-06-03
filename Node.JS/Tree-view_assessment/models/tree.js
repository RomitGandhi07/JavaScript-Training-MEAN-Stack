const mongoose = require('mongoose');
// const Joi = require('joi');

// Create Schema
const treeSchema=mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter name"],
        minlength: 3
    },
    children: [{
        _id: {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Tag",
           index: true
        },
        name: String,
        children: []
   }]
});

// Create model 
const Tree = mongoose.model('Tree', treeSchema);

// // This function is responsible for validating the name 
// const validateUser=(user)=>{
//     const schema=Joi.object({
//         name: Joi.string().trim().min(3).required(),
//         email: Joi.string().email().required(),
//         password: Joi.string().trim().min(5).required()
//     });
//     return schema.validate(user);
// }

module.exports.Tree=Tree;
// module.exports.validate=validateUser;