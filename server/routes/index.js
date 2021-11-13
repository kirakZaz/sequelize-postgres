const routes = [
    require('./auth.js'),
    require('./user.js'),
    require('./token.js')
];

module.exports = function router(app, db) {
    return routes.forEach((route) => {
        route(app, db);
    });
};