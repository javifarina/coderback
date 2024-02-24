const ProductManager = require("./ProductManager")
const express = require("express")
const app = express()
const PORT = 8080
app.use(express.urlencoded({extended:true}))

//const manager = new ProductManager("./products.json")




app.listen(PORT,() =>{
    console.log(`Server ON PORT:${PORT}`)
})