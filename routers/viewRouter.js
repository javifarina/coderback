const { Router } = require('express')
const {LoggedIn,NotLoggedIn, isAdmin } =require('../src/middlewares/auth.middlewares')
const router = Router()


// const ProductManager =require("../src/dao/fsManager/ProductManager")
// const manager = new ProductManager("./src/products.json")
const ProductManager = require("../src/dao/dbManager/ProductManager")
const CartManageer = require ('../src/dao/dbManager/cartManager')
const UserManager = require('../src/dao/dbManager/userManager')


const userManager = new UserManager()
const manager = new ProductManager()
const cartManager = new CartManageer()
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
router.get('/products',LoggedIn,async (req,res) =>{
    try {
        const idSesiion = req.session.user.id
        const user = await userManager.getUserById({_id:idSesiion})
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
        user:{
            fisrtName:user.firstName,
            lastName:user.lastName,
            email:user.email,
            age:user.age,
        }
    })
    } catch (error) {
        res.status(400).json(error)
    }
    
})
router.get('/carts/:cid',async (req,res) =>{
    try {
        const cart = await cartManager.getCartById(req.params.cid)
        console.log(cart)
    res.render("carts",{
        title:'Cart',
        subTitle:'Carts',
        cart
         
    })
    } catch (error) {
        res.status(400).json(error)
    }
    
})
router.get('/carga',isAdmin, async (req,res) =>{
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
router.get('/profile',LoggedIn, async (req, res) => {
    //const isLoggedIn = ![null, undefined].includes(req.session.user)
    const idSesiion = req.session.user.id
    const user = await userManager.getUserById({_id:idSesiion})
    console.log(user)

    res.render('profile', {
        title: 'My profile',
        subTitle: 'My profile',
        user:{
            fisrtName:user.firstName,
            lastName:user.lastName,
            email:user.email,
            age:user.age,
        }
    })
})
router.get('/logout',(req,res) =>{
    req.session.destroy(_ =>{
        res.redirect('/home')
    })
})
router.get('/login',NotLoggedIn, (_, res) => {
    
    res.render('login', {
        title: 'Login',
        subTitle:'login'
    })
})

router.get('/register',NotLoggedIn, (_, res) => {
    
    res.render('register', {
        title: 'Register',
        subTitle:'Register'
    })
})
router.get('/error', (_, res) => {
   
    res.render('error', {
        title: 'Error to access',
        subTitle:'Error to access',
    })
})

module.exports = router