const cartModel = require("../models/carts.model");
class cartManager {
  constructor() {}

  async getCarts() {
    try {
      const carts = await cartModel.find();
      return carts.map((d) => d.toObject({ virtuals: true }));
    } catch (error) {
      console.log({ Error: error });
    }
  }

  async addCart() {
    try {
      const newCart = {
        product: [],
      };
      await cartModel.create(newCart);
    } catch (error) {
      console.log(error);
    }
  }

  async getCartById(id) {
    const cartById = await cartModel.findOne({ _id: id });
    if (!cartById) {
      throw new Error(`No existe Carrito ${id}`);
    }
    return cartById;
    //TODO borrar un producto dentro de un card
  }
  async updateCartInProduct(cid, pid, qty){
      try {
        const cart = await this.getCartById(cid)
        if(cart){
          const product = await cart.product[0].find(e => e.product === pid)
        if(!product){
          return { status: "not found", message: "Producto no encontrado" };
        }
        if (qty === undefined) {
          const updatedCart = await cartModel.findOneAndUpdate(
            { _id: cid, "product.product": pid },
            { $inc: { "product.$.qty": 1 } },
            { new: true }
          )
          return { status: "Success!", message: "El carrito ha sido actualizado correctamente", updatedCart };
        }
        const updatedCart = await cartModel.findOneAndUpdate(
          { _id: cid, "product.product": pid },
          { $set: { "product.$.qty": qty } },
          { new: true }
        )
        return { status: "Success!", message: " actualizado correctamente", updatedCart };
      }
      
    } catch (error) {
        console.error('Error al actualizar', error);
        throw error;
    }
  }
  async cartsinToDelete() {}
}

module.exports = cartManager
