const express = require("express");
const { Router } = require('express')
const router = Router()

// const ProductManager =require("../src/dao/fsManager/ProductManager")
// const manager = new ProductManager("./src/products.json")
const ProductManager =require("../src/dao/dbManager/ProductManager")
const manager = new ProductManager()

router.get("/products", async (req,res)=>{
   try {
    const products = await manager.getProduct()
    const limit = parseInt(req.query.limit)
    if (!limit){
        return res.send({status:"Success",payload:products})
    }
    const productLimit = products.splice(0,limit)
         res.send({status:"Success",payload:productLimit})
   } catch (error) {
    return res.status(500).json({  message: error.message });
   }
})
      
router.get("/products/:pid",async (req,res)=>{
    const pid =req.params.pid
    console.log(pid)
    try {
        const productByid = await manager.getProductById(pid)
        res.send({status:"Success",payload:productByid})
    } catch (error) {
        return res.status(500).json({ error: 'Error al Buscar un Producto', message: error.message });
     }
})

router.post('/products',async(req,res) => {
    const data = req.body
    try {
    await manager.addProduct(data)
    return  res.send({status:"Success",payload:data})
    } catch (error) {
        return res.status(500).json({ error: 'Error al agregar el producto', message: error.message })
    }
})

router.put('/product/:pid', async(req,res) =>{
    const id =req.params.pid
    const data = req.body
    try {
        await manager.updateProduct(id,data)
        return res.send({status:"Success Update",payload:data})
    } catch (error) {
        return res.status(500).json({ error: 'Error al Actualizar un Producto', message: error.message })
    }
})

router.delete('/product/:pid',async (req,res) =>{
    const id = req.params.pid
    try {
        await manager.deleteProduct(id)
        return res.send({status:"Success Delete",payload:id})
    } catch (error) {
        return res.status(500).json({ error: 'Error al Borrar un Producto', message: error.message })
    }
})
module.exports = router