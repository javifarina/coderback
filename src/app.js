//Desafío N2 BACKEND CODER - Francsico JAvier Fariña
import express from 'express'
import productRouter from '../routers/productRouter.js'
import cartRouter from '../routers/cartRouter.js'

const app  = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
//Rutas
app.use('/api/',productRouter)
app.use('/api/',cartRouter)
//Server
app.listen(8080,()=>{
    console.log('servidor web listen 8080')
})
