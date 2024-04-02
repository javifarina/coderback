const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    user:{
        type:String,
        require:true
    },
    message:{
        type:String
    }
})
schema.virtual('id').get(function() {
    return this._id.toString()
})

module.exports = mongoose.model('Messages',schema, 'message')