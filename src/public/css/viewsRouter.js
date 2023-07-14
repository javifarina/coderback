import express from 'express'
import ProductManager from '../src/ProductManager.js'

const {Router} = express

const viewsRouterFn = (io) =>{
    const manager = new ProductManager('../src/productos.json',io)
    const viewsRouter = Router()

viewsRouter.get('/home',async(req,res) =>{
    try {
       const products= await manager.getProducts()
       if(products.length === 0){
            res.render('home','No existen Productos')
       }
       let params={
        title:'Productos',
        products,
        style:'style.css'
        }
       res.render('home',params)
            
    } catch (error) {
    
    }
})

viewsRouter.get('/realtimesproducts',async(req,res) =>{
    const products= await manager.getProducts()
    if(products.length === 0){
         res.render('home','No existen Productos')
    }    
        let params={
            title:"Products Real TImes", 
        }
        // JSON.stringify(products)
         await io.emit('addProduct',JSON.stringify(products))
         res.render('realtimesproducts',params)  
})
return viewsRouter
}

export default viewsRouterFn