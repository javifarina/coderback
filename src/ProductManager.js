import fs from 'fs'

export default class ProductManager {
    constructor(path) {
        this.path = path
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
            thumbnail: data.thumbnail,
            stock: data.stock
        }
        // Valida que no sean vacio
        if (!data.code ||
            !data.title ||
            !data.description ||
            !data.price ||
            !data.thumbnail ||
            !data.stock) {
            const error = `Todo los datos son requeridos`
            console.log(error)
            return error
        }


        return this.getProducts()
            .then((products) => {
                const codeOf = products.findIndex((e) => e.code === data.code)
                if (codeOf !== -1) {
                    const error = `EL code: ${data.code} ya existe No se pudo agregar producto`
                    console.log(error)
                    return error
                }
                newProduct.id = products.length + 1
                products.push(newProduct)
                console.log(`Producto CODE ${data.code} Agregado Exitosamente`)
                return fs.promises.writeFile(this.path, JSON.stringify(products, null, 2))
            })
            .catch((error) => {
                console.log("Error al guardar el Producto")
                return error
            })

    }

    getProductById(id) {
        return this.getProducts()
            .then((products) => {
                const productId = products.find((e) => e.id === id)
                if (!productId) {
                    const error = `EL ID: ${id} no existe no se encontro el producto`
                    console.log(error)
                    return error
                }
                return productId
            })
            .catch((error) => {
                console.log("Error al Obtener Producto")
            })
    }
    updateProduct(id, data) {
        return this.getProducts()
            .then((products) => {
                const productIndex = products.findIndex((e) => e.id === id)
                if (productIndex === -1) {
                    const error = `EL code ID que quieres actualizar no Existe`
                    console.log(error)
                    return error
                }
                products[productIndex].code = data.code
                products[productIndex].title = data.title
                products[productIndex].description = data.description
                products[productIndex].price = data.price
                products[productIndex].thumbnail = data.thumbnail
                products[productIndex].stock = data.stock
                console.log(`Producto ID: ${id} Actualizado Correctamente `)
                return fs.promises.writeFile(this.path, JSON.stringify(products, null, 2))
            })
            .catch((error) => {
                console.log('No se pudo Actualizar Producto')
                return error
            })
    }
    deleteProduct(id) {
        return this.getProducts()
            .then((product) => {
                const productIndex = product.findIndex((e) => e.id === id)
                if (productIndex === -1) {
                    const error = `EL code ID que quieres Borrar no Existe`
                    return error
                }
                product.splice(productIndex, 1)
                console.log(`Producto con ID: ${id} Borrado`)
                return fs.promises.writeFile(this.path, JSON.stringify(product, null, 2))

            })
            .catch(error => {
                console.log(`Error al obtener Producto`)
                return error
            })
    }
}