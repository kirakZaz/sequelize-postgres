const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    password: String,
    email: String,
    role: String
}, {
    versionKey: false // Unable auto-version after persist database
});

const Users = mongoose.model('Users', usersSchema);

module.exports = Users;