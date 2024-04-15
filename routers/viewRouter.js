const { Router } = require('express')

const router = Router()

// const ProductManager =require("../src/dao/fsManager/ProductManager")
// const manager = new ProductManager("./src/products.json")
const ProductManager =require("../src/dao/dbManager/ProductManager")
const manager = new ProductManager()
router.get('/home',async (req,res) => {
    try {
        const products = await manager.getProduct(req.query)
        //console.log(products)
        res.render('home',{
            title:'Productos ',
            subTitle:'Vista de Productos staticos',
            products
        })
       } catch (error) {
             res.status(400).json(error)
       }   
})
router.get('/products',async (req,res) =>{
    try {
        const products = await manager.getProduct(req.query)
    res.render("products",{
        title:'products',
        subTitle:'Products',
        products,
        prevPage:products.prevPage,
        nextPage: products.nextPage,
        page: products.page,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
        
    })
    } catch (error) {
        res.status(400).json(error)
    }
    
})
router.get('/carga',async (req,res) =>{
   try {
    res.render("formulario",{
        title:'Carga de Producto',
        subTitle:'Add product',
    })
   } catch (error) {
    res.status(400).json(error)
   }

})
router.get('/chat',async (req,res) =>{
    try {
     res.render("chat",{
         title:'Chat de Clientes',
        
     })
    } catch (error) {
     res.status(400).json(error)
    }
 
 })
router.post('/realtimeproducts',async(req,res) =>{
    const data = req.body
    try {
        //Construimos un Objeto
       const newProduct={
        title:data.title,
        description:data.description,
        category:data.category,
        code:data.code,
        price:+data.price,
        stock:+data.stok
       }
       //guardamos el obj 
       await manager.addProduct(newProduct)
       const wsServer =req.app.get('ws')
       wsServer.emit('newProduct', newProduct)

    } catch (error) {
        res.status(400).json(error)
    }
    
    res.render("formulario",{
        title:'Carga de Producto',
        subTitle:'Add product',
    })
   
})
module.exports = router