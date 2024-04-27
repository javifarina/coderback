const bcrypt = require("bcrypt")

module.exports = {
    //hashear Password
    hashPassword : value => { bcrypt.hashSync(value, bcrypt.genSaltSync(10))}
}