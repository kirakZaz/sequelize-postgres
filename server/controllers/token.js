const db = require("../models");
const Token = db.token;

exports.create = async (req, res) => {
    if (!req.body.username) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const token = {
        username: req.body.username,
        token: req.body.token
    };

    Token.create(token)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Token."
            });
        });
};

exports.findAll = async (req, res) => {
    try {
        const token = await Token.findAll();
        res.json(token);
    } catch (error) {
        console.log("Error: "+error);
    }
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Token.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Token with id=${id}.`
                });
            }
        })
        .catch(() => {
            res.status(500).send({
                message: "Error retrieving Token with id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;
    Token.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Token was updated successfully.",
                    data: req.body
                });

            } else {
                res.send({
                    message: `Cannot update Token with id=${id}. Maybe User was not found or req.body is empty!`
                });
            }
        })
        .catch(() => {
            res.status(500).send({
                message: "Error updating Token with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Token.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Token was deleted successfully!",
                    data: id
                });
            } else {
                res.send({
                    message: `Cannot delete Token with id=${id}. Maybe User was not found!`
                });
            }
        })
        .catch(() => {
            res.status(500).send({
                message: "Could not delete Token with id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    Token.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Token were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Tokens."
            });
        });
};
