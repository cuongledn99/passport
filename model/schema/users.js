var mongoose = require('mongoose');
var bycrypt = require('bcrypt-nodejs');

var users = mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    fullname: String,
    password: {
        type: String,
        require: true
    }
})

users.methods.encryptPassword = function (password) {
    return bycrypt.hashSync(password, bycrypt.genSaltSync(10), null);
}
users.methods.validPassword = function (password) {
    return bycrypt.compareSync(password, this.password);
}

module.exports = users;