const User = require("../../models/mogoose/users");
const Token = require("../../models/mogoose/tokens");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const verifySignUp = require("../../middleware/mongoose/VerifySingUp");

exports.signup = async (req, res) => {
    try {
        const re = /\S+@\S+\.\S+/;

        const { username, email, password } = req.body;

        // Validate user input
        if (!(email && password && username)) {
            res.status(400).send("All input is required");
        }
        if (!re.test(email)) {
            res.status(400).json({ error: "Email is not correct" });
        }

        let _id = mongoose.Types.ObjectId();

        const user = await User.create({
            _id,
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            role: req.body.role
        });
        const token = jwt.sign({ id: user.id }, process.env.TOKEN_KEY, {
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
        res.status(500).json({error: err});
    }
};

exports.signin = async (req, res, next) => {
    try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            res.status(400).json("All input is required");
        }
        // Validate if user exist in our database
        const user = await User.findOne({ email });


        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );

            req.body.token = token; 
            verifySignUp.verifyToken(req, res, next);

            Token.create({
                _id: mongoose.Types.ObjectId(),
                username: user.username,
                email: email,
                token: token
            });

            res.cookie('userID', user._id);

            // user
            res.status(200).json(user);
        } else {
            res.status(400).json({error: "Invalid Credentials"});
        }
    } catch (err) {
        res.status(500).json({error: err});
    }
};
