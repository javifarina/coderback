const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    age: Number,
    email: {
        type: String,
        unique: true
    },
    password: String,
    isAdmin:{
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model('User', schema, 'users')