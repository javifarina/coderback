import socketServer from './utils/io.js'
import fs from 'fs'

export default class ProductManager {
    constructor(path,io) {
        this.path = path
         this.io=io
    }
    
    getProducts() {
        return fs.promises.readFile(this.path, 'utf-8')
            .then((stringProducts) => {
                const products = JSON.parse(stringProducts)
                
                return products
            })
            .catch(error => {
                console.log('Error Lectura del archivo')
                return []
            })
    }

    addProduct(data) {
        const newProduct = {
            code: data.code,
            title: data.title,
            description: data.description,
            price: data.price,
           // thumbnail: data.thumbnail,
            stock: data.stock,
            category:data.category
        }
        // Valida que no sean vacio
        if (!data.code ||
            !data.title ||
            !data.description ||
            !data.price ||
            !data.stock ||
            !data.category) {
                throw new  Error(`Todo los datos son requeridos`)
        }
            return this.getProducts()
            .then((products) => {
                const codeOf = products.findIndex((e) => e.code === data.code)
                if (codeOf !== -1) {
                    throw new Error(`Ya existe un producto con el código '${data.code}'`)
                }
                newProduct.thumbnail=[]
                newProduct.id = products.length + 1
                products.push(newProduct,products)
                return fs.promises.writeFile(this.path, JSON.stringify(products, null, 2))
            })  
    }

    getProductById(id) {
        return this.getProducts()
            .then((products) => {
                const productId = products.find((e) => e.id === id)
                if (!productId) {    
                    throw new Error(`No existe el Producto con ID: '${id}'`)
                }
                return productId
            })   
    }

    updateProduct(id, data) {
        return this.getProducts()
            .then((products) => {
                const productIndex = products.findIndex((e) => e.id === id)
                if (productIndex === -1) {
                     throw new Error (`EL code ID ${id} que quieres actualizar no Existe`)
                   
                }
                products[productIndex].code = data.code
                products[productIndex].title = data.title
                products[productIndex].description = data.description
                products[productIndex].price = data.price
                products[productIndex].thumbnail = data.thumbnail
                products[productIndex].stock = data.stock
                products[productIndex].category=data.category
                return fs.promises.writeFile(this.path, JSON.stringify(products, null, 2))
            })
           
    }
    deleteProduct(id) {
        return this.getProducts()
            .then((product) => {
                const productIndex = product.findIndex((e) => e.id === id)
                if (productIndex === -1) {
                    throw new Error (`EL code ID ${id} que quieres Borrar no Existe`)
                }    
                product.splice(product, 1)
                return fs.promises.writeFile(this.path, JSON.stringify(product, null, 2))
            }) 
            .catch((error) => {
                throw new Error (`Error al leer el archivo no Existe`)
            })
    }
}