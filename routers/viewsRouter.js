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
    try {
        if(products.length === 0){
            res.render('home','No existen Productos')
       }    
           let params={
               title:"Products Real TImes", 
           }
            res.render('realtimesproducts',params)
            io.on('connection', socket =>{
                console.log('Nuevo Cliente Conectado !!',socket.id)
                io.emit('addProduct',JSON.stringify(products))
            }) 
    
    } catch (error) {
        
    }
})

viewsRouter.get('/crear',async(req,res) =>{
    let params={
        title:"Formulario de Carga", 
    }
    res.render('crear',params)
})

viewsRouter.post('/crear',async(req,res) =>{
    const product = JSON.stringify(req.body)
    console.log(product)
    await manager.addProduct(product)
    const newproducts= await manager.getProducts()
    io.on('connection', socket =>{
        console.log('Nuevo Cliente Conectado !!',socket.id)
        io.emit('addProduct',JSON.stringify(newproducts))
    }) 
    let params={
        title:"Formulario de Carga", 
    }
    res.render('crear',params)
})

return viewsRouter
}

export default viewsRouterFn