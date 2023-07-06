import express from 'express'
import ProductManager from '../src/ProductManager.js'
import CartManagaer from '../src/CartManager.js'
const {Router} = express

const managerCart = new CartManagaer('../src/carts.json')
const managerProduc = new ProductManager('../src/productos.json')



const cartRouter = Router()

cartRouter.post('/carts',async(req,res) => {
    await managerCart.addCart()
    return res.send({status:"Success"})
 })

 cartRouter.get('/carts/:cid',async (req,res)=>{
    const cid = parseInt(req.params.cid)
    try {
        const cartsById =await managerCart.getCartByID(cid)
        return res.send({status:"Success",payload:cartsById})
    } catch (error) {
        return res.status(500).json({ error: 'Error Al listar Carrito', message: error.message });
    }
    
 })

// cartRouter.post('/carts/:cid/products/:pid',async(req,res)=>{
//     const cid = parseInt(req.params.cid)
//     const pid = parseInt(req.params.pid)
//    try {
//     const carts = await managerCart.getCarts()
//     const cartbyId = await managerCart. getCartByID()
//     if(!cartbyId){
//         console.log("upa")
//         return res.status(500).json({ error: 'No hay', message: error.message });
//     }
//     const productById =await managerProduc.getProductById(pid)
//     if(!productById){
//         return res.status(500).json({ error: 'Error al Buscar un Producto', message: error.message });
//     }
//     const prodcar = cartbyId.product.find((e)=>e.product===pid)
//     console.log({productById});
//     if(!prodcar){
//         const newProd={
//             product:pid,
//             qty:1
//         }
//         cartbyId.product.push(newProd)
//      }else{
//         prodcar.qty=prodcar.qty+1
//      }
//     const posCart= carts.findIndex((e)=>e.id===cid)
//      carts[posCart].product=  cartbyId.product
//      console.log(carts)
//   await managerCart.setCart(carts)
    
//    } catch (error) {
//         error
//    }
// })
cartRouter.post('/carts/:cid/products/:pid',async(req,res)=>{
    const cid = parseInt(req.params.cid)
    const pid = parseInt(req.params.pid)
   try {
    const carts = await managerCart.getCarts()
    const cartbyId = await managerCart.getCartByID(cid)   
    if(!cartbyId){
        return res.status(500).json({ error: 'No hay', message: error.message });
    }
    const productById =await managerProduc.getProductById(pid)
    if(!productById){
        return res.status(500).json({ error: 'Error al Buscar un Producto', message: error.message });
    }
    const prodcar = cartbyId.product.find((e)=>e.product===pid)

    if(!prodcar){
        const newProd={
            product:pid,
            qty:1
        }
        cartbyId.product.push(newProd)
     }else{
        prodcar.qty=prodcar.qty+1
     }
    const posCart= carts.findIndex((e)=>e.id===cid)
     carts[posCart].product=  cartbyId.product
     await managerCart.setCart(carts)
     return res.send({status:"Success",payload:carts})
    
   } catch (error) {
    return res.status(400).json({ error: 'Not Fount 400', message: error.message });
   }
})

 export default cartRouter