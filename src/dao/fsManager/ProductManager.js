const fs = require("fs");
class ProductManager {
  constructor(path) {
    this.path = path;
  }

  /* 
  Crear productos en el archivo
  **/
  async createProduct(product) {
    await fs.promises.writeFile(this.path, JSON.stringify(product, null, "\t"));
  }

  /* 
  leer los producto desde el Archivo 
  */
  async readProducts() {
    try {
      const productFileContent = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(productFileContent);
    } catch (error) {
      return { erro: [] };
    }
  }

  /*
   * funcion donde se obtiene todos los  productos
   * desde el archivo
   */
  async getProduct() {
    try {
      const products = await this.readProducts();
      return products;
    } catch (error) {
      throw new Error(`Error al leer Archivo`);
    }
  }

  /**
   * funcion donde se  Agrega producto al Archivo
   */
  async addProduct(data) {
    const product = {
      title: data.title,
      description: data.description,
      price: data.price,
      category: data.category,
      code: data.code,
      stock: data.stock,
    };
    /* validar "code"*/

    const products = await this.readProducts();
    const productCode = products.find((pro) => pro.code === data.code);
    if (productCode) {
      throw new Error(`Ya existe un producto con el código '${data.code}'`);
    }
    if (
      data.title === "" ||
      data.description === "" ||
      isNaN(data.price) ||
      data.price < 0 ||
      data.category === "" ||
      data.code === "" ||
      isNaN(data.stock) ||
      data.stock < 0
    ) {
      throw new Error(`Todo los datos son requeridos`);
    }

    product.id = Number.parseInt(Math.random() * 1000);
    product.thumbnail = [];
    product.status = true;
    products.push(product);
    await this.createProduct(products);
  }

  async getProductById(id) {
    const products = await this.readProducts();
    const productById = products.find((pro) => pro.id === id);
    if (!productById) {
      throw new Error(`No existe el Producto con ID: '${id}'`);
    }
    return productById;
  }
 /*
  * Funcion para Actualizar Producto 
  */
  async updateProduct(id, udProduct) {
    const products = await this.readProducts();
    const idx = products.findIndex((pro) => pro.id === id);

    if (idx === -1) {
      throw new Error(`No existe el Producto con ID: '${id}'`);
    }

    (products[idx].title = udProduct.title || products[idx].title),
      (products[idx].description =
        udProduct.description || products[idx].description);
    products[idx].category = udProduct.category || products[idx].category;
    products[idx].price = udProduct.price || products[idx].price;
    products[idx].code = udProduct.code || products[idx].code;
    products[idx].stock = udProduct.stock || products[idx].stock;
    products[idx].status = udProduct.status || products[idx].status;
    products[idx].thumbnail = udProduct.thumbnail || products[idx].thumbnail;
    await this.createProduct(products);
  }
  /* 
  * Fincion que elimina un preoducto del arcivo
  */
  async deleteProduct(id) {
    const products = await this.readProducts();
    const idx = products.findIndex((pro) => pro.id === id);

    if (idx === -1) {
      throw new Error(`No existe el Producto con ID: '${id}'`);
    }

    products.splice(idx, 1);
    await this.createProduct(products);
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
