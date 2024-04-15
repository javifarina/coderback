const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
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
        require : true,
        index : true
    },
    category:{
        type: String,
        require : true,
        index : true
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
// schema.virtual('id').get(function() {
//     return this._id.toString()
// })
schema.plugin(mongoosePaginate)

module.exports = mongoose.model('Products',schema, 'product')