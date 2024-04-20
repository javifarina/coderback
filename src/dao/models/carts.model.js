const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    products :{
        type:[{
            productId:{
                type:mongoose.Schema.Types.ObjectId,
                ref: 'Products' //debe machear el nombre del modelo
            },
            qty:{type:Number, require: true}
        }],
        default:[],
       
    }
})
// schema.virtual('id').get(function() {
//     return this._id.toString()
// })
module.exports = mongoose.model('Carts',schema,'cart')