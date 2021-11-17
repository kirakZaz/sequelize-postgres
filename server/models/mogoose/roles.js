const mongoose = require('mongoose');

const rolesSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String
}, {
    versionKey: false // Unable auto-version after persist database
});

const Roles = mongoose.model('Roles', rolesSchema);

module.exports = Roles;