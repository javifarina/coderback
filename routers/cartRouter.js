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
  const cid = req.params.cid
  const pid = req.params.pid

  try {
    const carts = await cartsModel.find();
    const cartById = await managerCart.getCartById(cid);

    if (!cartById) {
      throw `El carrito con ID: ${cid}. No existe`;
    }
    const producById = await managerPro.getProductById(pid);
    if (!producById) {
      throw `El producto con ID: ${pid}. No existe`;
    }
    const prodcar = cartById.product.find((e) => e.product === pid);
    console.log(prodcar);
    if (!prodcar) {
      const newProd = {
        product: pid,
        qty: 1,
      };
      cartById.product.push(newProd);
    } else {
      prodcar.qty = prodcar.qty + 1;
    }
    const posCart = carts.findIndex((e) => e.id === cid);
    carts[posCart].product = cartById.product;
    await cartsModel.create(carts);
    res.send({ status: "Success", carts });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error al agregar el producto", message: error.message });
  }
});
module.exports = router;
