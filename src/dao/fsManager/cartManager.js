const fs = require("fs");
class cartManager {
  constructor(path) {
    this.path = path;
  }

  //Crear carritos en el archivo
  async createCart(cart) {
    await fs.promises.writeFile(this.path, JSON.stringify(cart, null, "\t"));
  }

  //leer los carritos desde el Archivo
  async readCarts() {
    try {
      const cartFileContent = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(cartFileContent);
    } catch (error) {
      return { erro: [] };
    }
  }

  async getCarts(){
    try {
        const carts = await this.readCarts()
        return carts
    } catch (error) {
        console.log({ Error: error });
    }
  }

  async addCart(){
    try {
        const newCart={
            product:[]
        }
        const carts = await this.getCarts()
        newCart.id =Number.parseInt(Math.random()*1000)
        carts.push(newCart)
        await this.createCart(carts)
    } catch (error) {
        console.log(error);
        }
    }

 async getCartById(id){

        const carts = await this.getCarts()
        const cartById = carts.find((crt) => crt.id ===id)
        if (!cartById){
            throw new Error(`No existe Carrito ${id}`)
        }
        return cartById
   
 }
}

module.exports = cartManager;
//testing
const main=async () =>{
    const manager = new cartManager('./carts.json')
    //console.log(await manager.getCarts())
    //await manager.addCart()
    console.log(await manager.getCartById(519))
}

//main()