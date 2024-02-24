const fs = require("fs");
class ProductManager {
  path = "./producto.json";
  static #ultId = 1;

  constructor(path) {
    this.path = path;
    this.products = [];
  }

  #getAndIcrement(){
    const id = ProductManager.#ultId
    ProductManager.#ultId ++
    return id
  }

  //Busca producto y devuelve ID 
  async findProductByID(id, products) {
    const product = products.find((pro) => pro.id === id);
    if (!product) {
      return { error: " Product Not foud" };
    }
    return product;
  }

  //busca el producto y  devuelve indice de producto
  async findIndexProduct(id, products) {
    const productIndex = products.findIndex((pro) => pro.id === id);
    if (productIndex === -1) {
      return { error: " Product Not foud" };
    }
    return productIndex;
  }

  //Crear productos en el archivo
  async createProduct(product) {
    await fs.promises.writeFile(this.path, JSON.stringify(product, null, "\t"));
  }

  //leer los producto desde el Archivo
  async readProducts() {
    try {
      const productFileContent = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(productFileContent);
    } catch (error) {
      return [];
    }
  }

//Mostrar Productos
  async getProduct() {
    try {
      const products = await this.readProducts();
      return products;
    } catch (error) {
      console.log({ Error: error });
    }
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    const product = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
    //validar "code"
    const products = await this.readProducts();
    const productCode = products.find((pro) => pro.code === code);
    if (productCode) {
      console.error({ Error: "EL codigo ya Existe!!" });
      return;
    }
    //validar que no ingrese valores en Blanco
    if (
      title === "" ||
      description === "" ||
      (isNaN(price) || price < 0) ||
      thumbnail === "" ||
      code === "" ||
      (isNaN(stock) || price < 0)
    ) {
      console.error({ Error: "No se Puede ingresar valores en Blanco" });
      return;
    }
    //Guardar Producto

    product.id=this.#getAndIcrement()
    products.push(product);
    await this.createProduct(products);
  }

  async getProductById(id) {
    try {
      const products = await this.readProducts();
      const product = await this.findProductByID(id, products);
      return console.log({ producById: id, product });
    } catch (error) {
      console.log(error);
    }
  }
//
  async updateProduct(id, udProduct) {
    try {
      const products = await this.readProducts();
      const productIndex = await this.findIndexProduct(id, products);
      products[productIndex].title = udProduct.title;
      products[productIndex].description = udProduct.description;
      products[productIndex].thumbnail = udProduct.thumbnail;
      products[productIndex].code = udProduct.code;
      products[productIndex].stock = udProduct.stock;
     
     await this.createProduct(products);
    } catch (error) {
      console.log(error);
    }
  }
//Elimina un preoducto del arcivo
  async deleteProduct(id) {
    try {
      const products = await this.readProducts();
      const productIndex = await this.findIndexProduct(id, products);
      products.splice(productIndex, 1);
      await this.createProduct(products);
      console.log(`Producto iD ${id} eliminado `)
    } catch (error) {
      console.log(error);
    }
  }
}

//testing
const main = async () => {
  //crear Instancia ProductManager
  const Manager = new ProductManager("./productos.json");
  // Listar todos los Productos del Archivo
  console.log(await Manager.getProduct());

  // Crear 3 Productos
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

//Borrar produccto ID 3
 await Manager.deleteProduct(3);

// Listar todos los Productos creados en el archivo
console.log(await Manager.getProduct());

};
//main();
