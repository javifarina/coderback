const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    title:{
        type  :String,
        require : true
    },
    description:{
        type : String,
        require : true
    },
    price:{
        type : Number,
        require : true
    },
    category:{
        type: String,
        require : true
    },
    code: {
        type: String,
        require : true,
        unique : true
    },
    stock:{
        type: Number,
        require: true,
        //ver maximo
    },
    status:{
        type: Boolean,
        default: true
    },
    thumbnail:{
        type: Array,
        default: []
    }
})
schema.virtual('id').get(function() {
    return this._id.toString()
})

module.exports = mongoose.model('Products',schema, 'product')