import express from 'express'
import ProductManager from '../src/ProductManager.js'
const {Router} = express

const manager = new ProductManager('../src/productos.json')
const productRouter = Router()

productRouter.get('/products',async (req,res)=>{
    try {
        const productos = await manager.getProducts()
        const limit = parseInt(req.query.limit)
        if (!limit){
            return res.send({status:"Success",payload:productos})
        }
        const productLimit = productos.splice(0,limit)
        return res.send({status:"Success",payload:productLimit})
    } catch (error) {
        console.log(error)
    }   
})

productRouter.get('/products/:pid',async (req,res)=>{
    const pid = parseInt(req.params.pid)
    try {
        const productID = await manager.getProductById(pid)
        return res.send({status:"Success",payload:productID})
    } catch (error) {
        return res.status(500).json({ error: 'Error al Buscar un Producto', message: error.message });
    }
})

productRouter.post('/products',async(req,res) => {
    const data = req.body
    try {
        await manager.addProduct(data)
        return  res.send({status:"Success",payload:data})
    } catch (error) {
        return res.status(500).json({ error: 'Error al agregar el producto', message: error.message });
    }
})

productRouter.put('/products/:pid',async(req,res) =>{
    const pid = parseInt(req.params.pid)
    const data = req.body
    try {
        await manager.getProductById(pid)
        await manager.updateProduct(pid,data)
        return res.send({status:"Success",payload:data})
    } catch (error) {
        return res.status(500).json({ error: 'Error al Actualizar un Producto', message: error.message });
    }
})

productRouter.delete('/products/:pid',async(req,res) =>{
    try {
        const pid = parseInt(req.params.pid)
        await manager.deleteProduct(pid)
        return res.send({status:"Success",payload:pid})
    } catch (error) {
        return res.status(500).json({ error: 'Error al Borrar un Producto', message: error.message });
    }
})

export default productRouter