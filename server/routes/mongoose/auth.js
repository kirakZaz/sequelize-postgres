const verifySignUp = require("../../middleware/mongoose/VerifySingUp");
const controller = require("../../controllers/mongose/login");


const express = require('express');
const router = express.Router();

router.post("/signin", controller.signin);

router.post("/signup", [
    verifySignUp.checkDuplicateUsernameOrEmail,
    verifySignUp.checkRolesExisted
], controller.signup);

module.exports = router;