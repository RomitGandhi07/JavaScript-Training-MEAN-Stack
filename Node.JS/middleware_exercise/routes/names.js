const { Name, validate } = require("../models/name");
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get("/", async (req, res) => {
    try{
        // Get all the names and send that in the response
        const names = await Name.find().select("_id firstName lastName");
        res.send(names);
    }
    catch(err){
        next(err);
    }
});

router.post("/", async (req, res, next) => {
    try {
        // Validating the input given by the user
        const { error } = validate(req.body);
        if (error) {
            throw({status: 400, message: error.details[0].message});
        }

        // Save name in the database and send that in the response
        let name = new Name({ firstName: req.body.firstName, lastName: req.body.lastName });
        name = await name.save();


        res.send(name);
    }
    catch (err) {
        next(err);
    }
})

router.put("/:id", async (req, res, next) => {
    try {
        // Validating the input given by the user
        const { error } = validate(req.body);
        if (error) {
            throw ({ status: 400, message: error.details[0].message });
        }

        // Update name in the database
        const name = await Name.findByIdAndUpdate(req.params.id, { firstName: req.body.firstName, lastName: req.body.lastName }, {
            new: true
        });

        // If id is not there then send 404 error
        if (!name) {
            throw ({ status: 404 });
        }

        // Send response
        res.send(name);
    }
    catch (err) {
        next(err);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        // Delete name using id
        const name = await Name.findByIdAndRemove(req.params.id);

        // If id is not there then send 404 error
        if (!name){
            throw({status:400});
        } 

        // Send response
        res.send(name);
    }
    catch (err) {
        next(err);
    }
});

module.exports = router;