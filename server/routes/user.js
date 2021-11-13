module.exports = app => {
    const users = require("../controllers/user.js");

    const router = require("express").Router();
    app.get("/api/users", users.findAll);
    // Create a new User
    router.post("/", users.create);

    // Retrieve all Users
    router.get("/users", users.findAll);


    // Retrieve a single User with id
    router.get("/:id", users.findOne);

    // Update a User with id
    router.put("/:id", users.update);

    // Delete a User with id
    router.delete("/:id", users.delete);

    // Create a new User
    router.delete("/", users.deleteAll);

    app.use('/api/users', router);
};
