const productModel = require('../models/products.model')
class ProductManager {
  constructor() { 
  }
  /*
   * funcion donde se obtiene todos los  productos
   * desde el archivo
   */
  async getProduct() {
    try {
      const products = await productModel.find();
      return products.map(d => d.toObject({ virtuals: true }));
    } catch (error) {
      throw new Error(`Error al leer Archivo`);
    }
  }

  /**
   * funcion donde se  Agrega producto al Archivo
   */
  async addProduct(data) {
    const {
      title,
      description,
      price,
      category,
      code,
      stock,
    } = data
    
    if (
      title === "" ||
      description === "" ||
      isNaN(data.price) ||
      price < 0 ||
      category === "" ||
      code === "" ||
      isNaN(stock) ||
      stock < 0
    ) {
      throw new Error(`Invalid Product Data`);
    }

   
    await productModel.create({
      title,
      description,
      price:+price,
      category,
      code,
      stock:+stock,
      status:true
    });
  }

  async getProductById(id) {
  
    const productById = productModel.findOne({ _id: id });
    if (!productById) {
      throw new Error(`No existe el Producto con ID: '${id}'`);
    }
    return productById;
  }
 /*
  * Funcion para Actualizar Producto 
  */
  async updateProduct(id, udProduct) {
    try {
      const updateProduct = await productModel.findByIdAndUpdate(id, udProduct, { new: true });
      return updateProduct;
    } catch (error) {
      throw error;
    }
  }
  /* 
  * Fincion que elimina un preoducto del Bd
  */
  async deleteProduct(id) {
    try {
      const deleteProduct = await productModel.deleteOne({ _id: id });
      return deleteProduct;
    } catch (error) {
      throw error;
    }
  }
}
module.exports = ProductManager;

//testing
const main = async () => {
  //crear Instancia ProductManager
  const Manager = new ProductManager("./products.json");
  // Listar todos los Productos del Archivo
  console.log(await Manager.getProduct());
  const newProduct = {
    title: "Zapatillas deportivas",
    description: "Zapatillas deportivas para correr",
    price: 59.99,
    category: "Zapatillas ",
    code: "4534532",
    stock: 2012,
  };
  await Manager.addProduct(newProduct);
  /*
  // Crear 3 Productos
  co
  await Manager.addProduct(
    "producto prueba 1",
    "Este es un Producto prueba 1",
    300,
    "Sin Imagen",
    "abc123",
    25
  );
  await Manager.addProduct(
    "producto prueba 2",
    "Este es un Producto prueba 2",
    200,
    "Sin Imagen",
    "abc124",
    25
  );
  await Manager.addProduct(
    "producto prueba 3",
    "Este es un Producto prueba 3",
    200,
    "Sin Imagen",
    "abc125",
    25
  );
 //lista un producto por ID
 await Manager.getProductById(3)
 
 // Listar todos los Productos creados en el archivo
 console.log(await Manager.getProduct());
 //Actualizamos el segundo producto con ID 2
 const uDproduct={
    title : "producto prueba 2",
    description :"Este es un Producto prueba 2 modificado",
    price :200,
    thumbnail : "Sin Imagen",
    code :"abc124",
    stock : 25}
    
await Manager.updateProduct(2, uDproduct);
*/
  //Borrar produccto ID 3

  //await Manager.deleteProduct(18);

  // Listar todos los Productos creados en el archivo
  console.log(await Manager.getProduct());
};
//main();
