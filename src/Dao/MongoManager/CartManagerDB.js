import cartModel from "../../models/cart.model.js";
import ProductManager from "../../models/product.model.js";

class CartManager {

  constructor(){
    this.model=cartModel
  }

  async createCart(cartData) {
    try {
      const addCart = await this.model.create(cartData);
      return addCart;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }

  async addProductToCart(cartId, productId) {
    try {
    const product = await ProductManager.getProductById(productId);
        if (!product) {
        throw new Error("Product not found old");
        }

      const cart = await this.model.findById(cartId);
      if (!cart) {
        throw new Error("Cart not found");
      }

      const existingProductIndex = cart.products.findIndex(
        (item) => item.product.toString() === productId
      );

      if (existingProductIndex !== -1) {
        cart.products[existingProductIndex].quantity += 1;
      } else {
        const newProduct = {
          product: productId,
          quantity: 1,
        };
        cart.products.push(newProduct);
      }

      const result = await cart.save();
      return result;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }

  async getCarts() {
    try {
      const cart = await this.model.find()
      return cart
    } catch (error) {
      console.log(error)
      throw new Error(error.message)
    }
  }

  async getCartById(cartId) {
    try {
      const cart = await this.model.findById(cartId);
      if (!cart) {
        throw new Error("Cart not found");
      }
      return cart;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }

  async removeProductFromCart(cartId, productId) {
    try {
      const cart = await this.model.findById(cartId);
      if (!cart) {
        throw new Error("Cart not found");
      }

      cart.products = cart.products.filter(
        (item) => item.product.toString() !== productId
      );

      const result = await cart.save();
      return result;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }

  async updateCart(cartId, updatedProducts) {
    try {
      const cart = await this.model.findById(cartId);
      if (!cart) {
        throw new Error("Cart not found");
      }

      cart.products = updatedProducts;
      const result = await cart.save();
      return result;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }
}

export default CartManager