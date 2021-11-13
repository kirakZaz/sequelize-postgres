const controller = require("../controllers/token");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/tokens", controller.findAll);
    app.get("/api/tokens/id", controller.findOne);
    app.get("/api/tokens/id", controller.update);
    app.get("/api/tokens/id", controller.delete);
};