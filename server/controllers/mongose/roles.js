const mongoose = require("mongoose");
const Roles = require("../../models/mogoose/roles");

exports.findAll = (req, res) => {
    try {
        Roles.find({}, (err, roles) => {
            if (err) res.status(400).json({ error: "Invalid request, something went wrong!" });
            if (!roles) res.status(401).json({ error: "Unauthorized action!" });
            res.json(roles);
        });
    } catch (e) {
        res.status(401).json({ error: "Unauthorized action!" });
    }
};
exports.create = (req, res) => {
    try {
        let { name } = req.body;
        let _id = mongoose.Types.ObjectId();

        Roles.create({ _id, name }, (err, role) => {
            if (err) res.status(400).json({ error: "Invalid request, something went wrong!", err });
            res.status(201).json(role);
        });
    } catch (e) {
        res.status(401).json({ error: "Unauthorized action!" });
    }
};