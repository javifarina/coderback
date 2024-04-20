const productModel = require("../models/products.model");
const cartModel = require("../models/carts.model");
const cartsModel = require("../models/carts.model");

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
    const cartById = await cartModel.findOne({ _id: id }).populate('products.productId')
    if (!cartById) {
      throw new Error(`No existe Carrito ${id}`);
    }
    return cartById;
   
  }


  async addProductCart(cid, pid, qty){
      try {
       
        const cart = await cartModel.findById(cid)
        //const productInCart = cart.products.map((d) => d.toObject({ virtuals: true }))
    
        if(cart){
         const product =  cart.products.find(p => p.productId.equals(pid))
         console.log(product)
         if(product){
          if(qty === undefined){
            const udpCart = await cartModel.findOneAndUpdate(
              { _id: cid, "products.productId": pid },
              { $inc: { "products.$.qty": 1 }},
              {
                new : true
              }
             
            )
            return { status: "Success!", message: "El carrito ha sido actualizado correctamente", udpCart }
          }

          const udpCart = await cartModel.findOneAndUpdate(
            { _id: cid, "products.productId": pid },
            { $set: { "products.$.qty": qty } },
            {
              new : true
            }
          )
          return { status: "Success!", message: "El carrito ha sido actualizado correctamente", udpCart }
         }

         const newProd = { productId: pid, qty:+1}

        
         cart.products.push(newProd)
        
         await cart.save()

        console.log({ status: "Success!", message: "El carrito ha sido actualizado correctamente" })
        return cart
      }
      
    } catch (error) {
        console.error('Error al actualizar', error);
        throw error;
    }
  }

  async updateCart(cid, data) {
    try {
      const productsAdded = []
      const productExchange = []
      const cart = await cartModel.findById(cid)
      if (!cart) {
        throw new Error(`El carrito ${cid} no existe`)
      }
      
      for (const product of data) {
        const productToAddId = product.productId
        let productToAddquantity = product.qty
        if (productToAddId.length !== 24) {
          productExchange.push(product)
        } else {
          const foundProduct =  cart.products.find(p => p.productId.equals(productToAddId))
          console.log({findpro:foundProduct})
          if (foundProduct !== undefined) {
            productToAddquantity += foundProduct.qty
            await cartModel.findOneAndUpdate(
              { _id: cid, "products.productId": productToAddId },
              { $set: { "products.$.qty": productToAddquantity } },
              { new: true }
            )
            productsAdded.push({productId:productToAddId, qty:productToAddquantity})
          } else {
            const validProduct = await productModel.findById(productToAddId)
            if (validProduct) {
              const newProduct = {
                productId: productToAddId,
                qty: productToAddquantity
              }
              cart.products.push(newProduct)
              //console.log (cart)
              await cart.save()
              productsAdded.push(product)
              console.log(`${productToAddId} agregado al carrito`)
            } else {
              console.log(`el producto ID ${productToAddId} no existe no fue posible agregarlo al carrito`)
              productExchange.push(product)
            }
          }
        }
      }
      console.log({ status: "Success!", message: "the cart is update success", productsAdded, productExchange })
      return cart
    } catch (error) {
      console.error("Error updating cart:", error)
      throw error 
    }
  }
  async deleteProducInCart(cid, pid) {
    try {
      const cart = await cartModel.findById(cid)
      if (cart) {

        if (pid !== undefined) {
          const product = cart.products.find(p => p.productId.equals(pid))
          if (product) {
            await cartModel.findByIdAndUpdate(cid, { $pull: { products: { productId: pid } } })
            return `Producto ID ${pid} eliminado del carrito ${cid}`

          } else {
            return `el producto ${pid} no existe en el carrito ${cid}`
          }

        }
        await cartsModel.findByIdAndUpdate(cid, { $set: { products: [] } })
        return `Carrito ID ${cid} vaciado`

      }
      return `el carrito ${cid} no existe`
    }



    catch (err) {
      console.log('Error al eliminar. error :' + err)
    }


  }





}

module.exports = cartManager
