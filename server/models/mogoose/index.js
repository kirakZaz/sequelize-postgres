const dbConfig = {
    url: 'mongodb+srv://kiraZa:nvzhq0gy@cluster0.ejznt.mongodb.net/robo?retryWrites=true&w=majority'
    // url: 'mongodb+srv://kiraZa:nvzhq0gy@cluster0.ejznt.mongodb.net/robo'
};

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

db.user = require("./users")(mongoose);
db.token = require("./tokens")(mongoose);
db.role = require("./roles")(mongoose);

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;