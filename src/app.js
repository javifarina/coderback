
const express = require("express")
const productRouter = require('../routers/productRouter')
const cartRouter = require('../routers/cartRouter')
const app = express()
const PORT = 8080
//Express
app.use(express.static(`${__dirname}/../public`))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Rutas
app.use('/api/',productRouter)
app.use('/api/',cartRouter)

app.listen(PORT,() =>{
    console.log(`Server ON http://localhost:${PORT}`)
})