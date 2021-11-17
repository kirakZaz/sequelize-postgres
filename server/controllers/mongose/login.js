const config = {
    secret: "bezkoder-secret-key"
};

// const db = require("../../models/mogoose");
// const User = db.user;
// const Role = db.role;

const User = require("../../models/mogoose/users");
const Token = require("../../models/mogoose/tokens");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

exports.signup = async (req, res) => {
    try {
        const re = /\S+@\S+\.\S+/;

        const { username, email, password } = req.body;

        // Validate user input
        if (!(email && password && username)) {
            res.status(400).send("All input is required");
        }
        if (!re.test(email)) {
            res.status(400).send("Email is not correct");
        }


        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }
        let _id = mongoose.Types.ObjectId();
        const user = await User.create({
            _id,
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            role: req.body.role
        });
        const token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // 24 hours
        });

        await Token.create({
            _id: mongoose.Types.ObjectId(),
            username: user.username,
            email: email,
            token: token
        });

        user.token = token;

        // return new user
        res.status(201).json(user);

    }  catch (err) {
        console.log(err);
    }

    // user.save((err, user) => {
    //     if (err) {
    //         res.status(500).send({ message: err });
    //         return;
    //     }
    //
    //     if (req.body.roles) {
    //         Role.find(
    //             {
    //                 name: { $in: req.body.roles }
    //             },
    //             (err, roles) => {
    //                 if (err) {
    //                     res.status(500).send({ message: err });
    //                     return;
    //                 }
    //
    //                 user.roles = roles.map(role => role._id);
    //                 user.save(err => {
    //                     if (err) {
    //                         res.status(500).send({ message: err });
    //                         return;
    //                     }
    //
    //                     res.send({ message: "User was registered successfully!" });
    //                 });
    //             }
    //         );
    //     } else {
    //         Role.findOne({ name: "user" }, (err, role) => {
    //             if (err) {
    //                 res.status(500).send({ message: err });
    //                 return;
    //             }
    //
    //             user.roles = [role._id];
    //             user.save(err => {
    //                 if (err) {
    //                     res.status(500).send({ message: err });
    //                     return;
    //                 }
    //
    //                 res.send({ message: "User was registered successfully!" });
    //             });
    //         });
    //     }
    // });
};

exports.signin = async (req, res) => {
    try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
                { user_id: user._id, email },
                config.secret,
                {
                    expiresIn: "2h",
                }
            );
            Token.create({
                _id: mongoose.Types.ObjectId(),
                username: user.username,
                email: email,
                token: token
            });
            // save user token
            user.token = token;
            res.cookie('userID', user._id);
            // user
            res.status(200).json(user);
        }
        res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
    }
    // User.findOne({
    //     username: req.body.username
    // })
    //     .populate("roles", "-__v")
    //     .exec((err, user) => {
    //         if (err) {
    //             res.status(500).send({ message: err });
    //             return;
    //         }
    //
    //         if (!user) {
    //             return res.status(404).send({ message: "User Not found." });
    //         }
    //
    //         const passwordIsValid = bcrypt.compareSync(
    //             req.body.password,
    //             user.password
    //         );
    //
    //         if (!passwordIsValid) {
    //             return res.status(401).send({
    //                 accessToken: null,
    //                 message: "Invalid Password!"
    //             });
    //         }
    //
    //         const token = jwt.sign({ id: user.id }, config.secret, {
    //             expiresIn: 86400 // 24 hours
    //         });
    //
    //         const authorities = [];
    //
    //         for (let i = 0; i < user.roles.length; i++) {
    //             authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
    //         }
    //         res.status(200).send({
    //             id: user._id,
    //             username: user.username,
    //             email: user.email,
    //             roles: authorities,
    //             accessToken: token
    //         });
    //     });
};
