import http from 'http';
import express from 'express';

import logger from 'morgan';
import bodyParser from 'body-parser';
import router  from './server/routes';
import db from './server/models';

require('dotenv').config();

const hostname = process.env.DB_HOST;
const port =  process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);

function main () {
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));

    app.set('view engine', 'html');

    db.sequelize.sync();
    // app.use('/', userRoutes);

    const Role = db.role;
    db.sequelize.sync().then(() => {
        console.log("Drop and re-sync db.");
        initial();
    });

    function initial() {
        Role.create({
            id: 1,
            name: "user"
        });

        Role.create({
            id: 2,
            name: "moderator"
        });

        Role.create({
            id: 3,
            name: "admin"
        });
    }

    router(app, db);

    app.get("/", function (request, response) {
        response.sendFile(__dirname + "/server/views/register.html");
    });
    app.get("/singin", function (request, response) {
        response.sendFile(__dirname + "/server/views/login.html");
    });
    app.get("/users", function (request, response) {
        response.sendFile(__dirname + "/server/views/users.html");
    });
    app.get("/tokens", function (request, response) {
        response.sendFile(__dirname + "/server/views/tokens.html");
    });


    server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    });
}

main();