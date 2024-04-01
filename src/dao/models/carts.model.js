const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    product :{
        type:Array,
        default:[]
    }
})
schema.virtual('id').get(function() {
    return this._id.toString()
})
module.exports = mongoose.model('Carts',schema,'cart')