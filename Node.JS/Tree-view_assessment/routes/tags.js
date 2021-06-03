const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Tag } = require('../models/tag');

router.get("/", async (req, res) => {
    const tags = await Tag.find({}).select();
    res.json(tags);
});

router.get("/:id", async (req, res) => {
    const tag = await Tag.findById(req.params.id).select();
    res.json(tag);
});

router.post("/", async (req, res) => {
    try {
        // Add tag to tags collection
        const tag = new Tag({ name: req.body.name, parent_id: req.body.parent_id });
        const result = await tag.save();

        // Update the parent collection and add id of current tag to children array of parent
        const parent = await Tag.findById(req.body.parent_id).select();
        if (!parent) { return res.status(404).json("Tag with given Id not found"); }

        parent.children.push({ _id: result._id, name: result.name });
        const parentSave = await parent.save();

        // Send response
        res.json(result);
    }
    catch (err) {
        return res.status(500).send("Something went wrong");
    }
})

router.post("/parent", async (req, res) => {
    try {
        // Add tag to tags collection
        const tag = new Tag({ name: req.body.name });
        const result = await tag.save();

        // Send response
        res.json(result);
    }
    catch (err) {
        return res.status(500).send("Something went wrong");
    }
})

router.delete("/:id", async (req, res) => {
    try {
        // Check whether id is valid or not and if yes then save the response
        const tag = await Tag.findById(req.params.id).select();
        if (!tag) { return res.status(404).json("Tag with given Id not found"); }

        // Delete Element and it's child elements
        const tags = await Tag.deleteMany({ _id: { $in: req.body.elements } });
        if (!tags) { return res.status(404).json("Tag with given Id not found"); }

        // Find parent of that tag and remove entry of that children from the parent
        if (tag.parent_id != null) {
            const parent = await Tag.findById(tag.parent_id).select();
            if (!parent) { return  res.status(404).json("Tag with given Id not found");}

            // Looping over childern array of parent
            for (let i = 0; i < parent.children.length; ++i) {
                // Remove entry from parent
                if (String(parent.children[i]._id) === String(tag._id)) {
                    parent.children.splice(i, 1);
                    break;
                }
            }
            const parentSave = await parent.save();
        }
        
        res.json(tags);
    }
    catch (err) {
        return res.status(500).send("Something went wrong");
    }

})

router.put("/move/:id", async (req, res) => {
    try {
        // Update parent_id of tag
        const tag = await Tag.findByIdAndUpdate(req.params.id, { parent_id: req.body.parent_id });

        // Find parent of that tag and remove entry of that children from the parent
        if (tag.parent_id != null) {
            const parent = await Tag.findById(tag.parent_id).select();

            for (let i = 0; i < parent.children.length; ++i) {
                // Remove entry from parent
                if (String(parent.children[i]._id) === String(tag._id)) {
                    parent.children.splice(i, 1);
                    break;
                }
            }
            const parentSave = await parent.save();
        }


        // Update the parent collection and add id of current tag to children array of parent
        const curParent = await Tag.findById(req.body.parent_id).select();
        curParent.children.push({ _id: tag._id, name: tag.name });
        const curparentSave = await curParent.save();

        // Send response
        tag.parent_id = req.body.parent_id;
        res.json(tag);
    }
    catch (err) {
        return res.status(500).send("Something went wrong");
    }
})


router.put("/:id", async (req, res) => {
    try {
        // Update parent_id of tag
        const tag = await Tag.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
        if (!tag) { return res.status(404).send("Tag with given Id not found..."); }

        // Find parent of that tag and remove entry of that children from the parent
        if (tag.parent_id != null) {
            const parent = await Tag.findById(tag.parent_id).select();

            for (let i = 0; i < parent.children.length; ++i) {
                // Remove entry from parent
                if (String(parent.children[i]._id) === String(tag._id)) {
                    parent.children[i].name = tag.name;
                    break;
                }
            }
            const parentSave = await parent.save();
        }
        res.json(tag);
    }
    catch (err) {
        return res.status(500).send("Something went wrong");
    }
})

module.exports = router;