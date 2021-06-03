const { User, validate } = require("../models/user");
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get("/", async (req, res) => {
    // Get all the names and send that in the response
    const names = await Name.find().select("_id firstName lastName");
    res.send(names);
});

router.post("/", async (req, res) => {
    // Validating the input given by the user
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Save name in the database and send that in the response
    let name = new Name({ firstName: req.body.firstName, lastName: req.body.lastName });
    name = await name.save();

    res.send(name);

})

router.put("/:id", async (req, res) => {
    // Validating the input given by the user
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Update name in the database
    const name = await Name.findByIdAndUpdate(req.params.id, { firstName: req.body.firstName, lastName: req.body.lastName }, {
        new: true
    });

    // If id is not there then send 404 error
    if (!name) return res.status(404).send('The name with the given ID was not found.');

    // Send response
    res.send(name);
});

router.delete("/:id", async (req, res) => {
    // Delete name using id
    const name = await Name.findByIdAndRemove(req.params.id);

    // If id is not there then send 404 error
    if (!name) return res.status(404).send('The name with the given ID was not found.');

    // Send response
    res.send(name);
});

module.exports = router;