
const express = require("express")
const handlebars = require('express-handlebars')
const mongoose = require('mongoose')
const { Server } = require('socket.io')

/* Routers*/
const productRouter = require('../routers/productRouter')
const cartRouter = require('../routers/cartRouter')
const viewsRouter = require('../routers/viewRouter')

/* Express  variables estaticas*/
const app = express()
const PORT = 8080
app.use(express.static(`${__dirname}../../public`))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

/* Plantillas Handlebars */
app.engine('handlebars',handlebars.engine())
app.set('views',`${__dirname}/views`)
app.set('view engine', 'handlebars')

/* Rutas */
app.use('/api/',productRouter)
app.use('/api/',cartRouter)
app.use('/',viewsRouter)

const main = async () =>{
/* Configuracion del Servidor http */
    const httpServer= app.listen(PORT,() =>{
    console.log(`Server ON http://localhost:${PORT}`)
})
/* configuracion Servidor WS */
const wsServer = new Server(httpServer)
app.set('ws',wsServer)

wsServer.on('connection',(ClientSocket) =>{
    console.log(`Cliente Conectado, ID : ${ClientSocket.id}`)
})
/**
 * Configurar la conexion de BD
 */
await mongoose.connect('mongodb+srv://CoderUserfrancisco:LpTzC7ytZ9dDWMNN@cluster0.shjdpcd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',{
    dbName:'ecommerce'
})
}
main()