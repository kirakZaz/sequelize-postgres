const mongoose = require("mongoose");
// const db = require("./server/models/mogoose");

const { MONGO_URI } = process.env;

exports.connect = () => {
    mongoose
        .connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => {
            console.log("Connected to the database!");
            // initial();

        })
        .catch(err => {
            console.log("Cannot connect to the database!", err);
            process.exit();
        });
};