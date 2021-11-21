const express = require('express');
const router = express.Router();
const { userMiddleware } = require('../../middleware/mongoose/userMiddleware');

const controller = require("../../controllers/mongose/users");

router.get("/",  controller.findAll);

router.post("/", userMiddleware, controller.create);

router.get("/:id", controller.findOne);

router.put("/:id", controller.update);

router.delete("/:id", controller.delete);

module.exports = router;