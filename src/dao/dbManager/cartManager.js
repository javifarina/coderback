const cartModel = require('../models/carts.model')
class cartManager {
  constructor() {}

  
  async getCarts(){
    try {
        const carts = await cartModel.find()
        return carts.map(d => d.toObject({ virtuals: true }));
    } catch (error) {
        console.log({ Error: error });
    }
  }

  async addCart(){
    try {
      const newCart={
        product:[]
    }
         await cartModel.create(newCart)
    } catch (error) {
        console.log(error);
        }
    }

 async getCartById(id){
    const cartById = await cartModel.findOne({ _id: id })
        if (!cartById){
            throw new Error(`No existe Carrito ${id}`)
        }
        return cartById
   
 }
}

module.exports = cartManager;
