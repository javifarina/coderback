const ProductManager =require("./ProductManager")
const express = require("express")
const app = express()
const PORT = 8080
app.use(express.urlencoded({ extended: true }))

const manager = new ProductManager("./src/products.json")

app.get("/products", async (req,res)=>{

 const products = await manager.getProduct()
    const limit = parseInt(req.query.limit)
    if (!limit){
        return res.send(products)
    }
    const productLimit = products.splice(0,limit)
    return res.send(productLimit)
})

app.get("/products/:pid",async (req,res)=>{
    const pid =parseInt(req.params.pid)
    const producByid = await manager.getProductById(pid)
    if (!producByid){
        return res.end(`El producto con ID: ${pid}. No existe`)
    }
        return res.send(producByid)
})


app.listen(PORT,() =>{
    console.log(`Server ON http://localhost:${PORT}`)
})