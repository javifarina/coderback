const { Router } = require("express");

// const ProductManager = require("../src/dao/fsManager/ProductManager");
// const CartManager = require("../src/dao/fsManager/cartManager");
// const managerPro = new ProductManager("./src/products.json");
// const managerCart = new CartManager("./src/carts.json");

const ProductManager = require("../src/dao/dbManager/ProductManager");
const CartManager = require("../src/dao/dbManager/cartManager");
const cartsModel = require("../src/dao/models/carts.model");

const managerPro = new ProductManager();
const managerCart = new CartManager();
const router = Router();

router.post("/carts", async (req, res) => {
  await managerCart.addCart();
  res.status(201).json({ message: "Success" });
});

router.get("/carts/:cid", async (req, res) => {
  const cid = req.params.cid
  try {
    const cartById = await managerCart.getCartById(cid);
    res.send({ status: "Success", payload: cartById });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error al obtener el carrito", message: error.message });
  }
});

router.post("/carts/:cid/products/:pid", async (req, res) => {
  
  try {
    const cid = req.params.cid
    const pid = req.params.pid 
    //const carts = await cartsModel.find();
    const cartById = await managerCart.getCartById(cid);

    if (!cartById) {
      throw `El carrito con ID: ${cid}. No existe`;
    }
    const producById = await managerPro.getProductById(pid);
    if (!producById) {
      throw `El producto con ID: ${pid}. No existe`;
    }
    const carts = await managerCart.addProductCart(cid,pid)
    res.send({ status: "Success", carts });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error al agregar el producto", message: error.message });
  }
});

router.put("/carts/:cid/products/:pid", async (req, res) => {
  try {
    const cid = req.params.cid
    const pid = req.params.pid
    const  {qty}  =req.body

    const product = await managerPro.getProductById(pid)
    if (!product) {
        res.status(400).json("producto no encontrado")
        return
    }
   const update = await managerCart.addProductCart(cid, pid, qty)
   res.send({ status: "Success", update });
  } catch (error) {
    return res.status(500).json({  message: error.message });
  }
});
router.put('/carts/:cid', async(req,res) =>{
  const cid= req.params.cid
  const data = req.body
  try {
  
    const cartById = await managerCart.getCartById(cid)
    if (!cartById){
      throw `El carts con ID: ${cid}. No existe`;
    }
    const cart = await managerCart.updateCart(cid,data)
    res.send({ status: "Success", cart });
  } catch (error) {
    return res.status(500).json({  message: error.message });
  }
})
router.delete('/carts/:cid/products/:pid',async(req,res) =>{
  const cid = req.params.cid
  const pid = req.params.pid
  try {
    const productDelete = await managerCart.deleteProducInCart(cid,pid)
    res.send({ status: "Success", payload: productDelete });
  } catch (error) {
    return res.status(500).json({  message: error.message });
  }
})
module.exports = router;