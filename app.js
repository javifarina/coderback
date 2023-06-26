//Desafío N2 BACKEND CODER - Francsico JAvier Fariña
import express from 'express'
import ProductManager from './ProductManager.js'

const manager = new ProductManager('./productos.json')

const app  = express()
app.get('/products',async (req,res)=>{
    const productos = await manager.getProducts()
    const limit = parseInt(req.query.limit)
    if (!limit){
        return res.send(productos)
    }
    const productLimit = productos.splice(0,limit)
    return res.send(productLimit)
   
})

app.get('/products/:pid',async (req,res)=>{
    const productos = await manager.getProducts()
    const pid = parseInt(req.params.pid)
    const productID = productos.find((e)=> e.id===pid)
    if (!productID){
        return res.end(`El producto con ID: ${pid}. No existe`)
    }
    return res.send(productID) 
})

app.listen(8080,()=>{
    console.log('servidor web listen 8080')
})
