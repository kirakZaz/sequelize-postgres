const { authJwt } = require("../middleware");
const controller = require("../controllers/user");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/users", controller.findAll);
    app.get("/api/users/id", controller.findOne);
    app.get("/api/users/id", controller.update);
    app.get("/api/users/id", controller.delete);

    app.get(
        "/api/users/user",
        [authJwt.verifyToken],
        controller.userBoard
    );

    app.get(
        "/api/users/mod",
        [authJwt.verifyToken, authJwt.isModerator],
        controller.moderatorBoard
    );

    app.get(
        "/api/users/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminBoard
    );
};