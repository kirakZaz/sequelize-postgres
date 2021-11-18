import http from 'http';
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';


// todo sequelize connection
// import router  from './server/routes';
// import db from './server/models';
// ----
// todo mongo connection
const db = require("./server/models/mogoose");
const mongoRouter = require("./server/routes/mongoose");

import swaggerDocument from './server/swagger.json';

const dotenv = require('dotenv');
dotenv.config();

const Role = db.role;

require('dotenv').config();

const hostname = process.env.DB_HOST;
const port =  process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);

function main () {
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));

    app.use('/swagger',
        swaggerUi.serve,
        swaggerUi.setup(swaggerDocument, { explorer: true })
    );

    app.set('view engine', 'html');

    // todo sequelize connection
    // db.sequelize.sync();
    // const Role = db.role;
    // db.sequelize.sync().then(() => {
    //     console.log("Drop and re-sync db.");
    //     initial();
    // });
    //
    // function initial() {
    //     Role.create({
    //         id: 1,
    //         name: "user"
    //     });
    //
    //     Role.create({
    //         id: 2,
    //         name: "moderator"
    //     });
    //
    //     Role.create({
    //         id: 3,
    //         name: "admin"
    //     });
    // }
    // router(app, db);

    function initial() {
        Role.estimatedDocumentCount((err, count) => {
            if (!err && count === 0) {
                new Role({
                    name: "user"
                }).save(err => {
                    if (err) {
                        console.log("error", err);
                    }

                    console.log("added 'user' to roles collection");
                });

                new Role({
                    name: "moderator"
                }).save(err => {
                    if (err) {
                        console.log("error", err);
                    }

                    console.log("added 'moderator' to roles collection");
                });

                new Role({
                    name: "admin"
                }).save(err => {
                    if (err) {
                        console.log("error", err);
                    }

                    console.log("added 'admin' to roles collection");
                });
            }
        });
    }

    app.use('/api/', mongoRouter);

    app.get("/", function (request, response) {
        response.sendFile(__dirname + "/server/views/register.html");
    });
    app.get("/signin", function (request, response) {
        response.sendFile(__dirname + "/server/views/login.html");
    });
    app.get("/users", function (request, response) {
        response.sendFile(__dirname + "/server/views/users.html");
    });
    app.get("/tokens", function (request, response) {
        response.sendFile(__dirname + "/server/views/tokens.html");
    });
    db.mongoose
        .connect(db.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => {
            console.log("Connected to the database!");
            initial();
            server.listen(port, hostname, () => {
                console.log(`Server running at http://${hostname}:${port}/`);
            });

        })
        .catch(err => {
            console.log("Cannot connect to the database!", err);
            process.exit();
        });

}

main();