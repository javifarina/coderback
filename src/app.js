import express from 'express'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import viewsRouter from './router/views.routes.js'
import ProductRouter from './router/product.routes.js'
import CartRouter from './router/carts.routes.js'
import messageModel from './models/chat.model.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
const app = express()
app.use(express.json())

const PORT = 8080
const serverHttp = app.listen(PORT, () =>
  console.log(`Server is Run http://localhost:${PORT}`)
)
const io = new Server(serverHttp)

app.set("socketio", io)

app.use(express.static('./src/public'))
app.engine("handlebars", handlebars.engine());
app.set('views', './src/views')
app.set("view engine", "handlebars")

mongoose.set('strictQuery', false)

try {
  
//mongo DB Conection
await mongoose.connect(process.env.MONGODB_URI)

   console.log('Base de Datos esta Conectada !!')

    app.use("/api/products", ProductRouter)
    app.use("/api/carts", CartRouter)
    app.use("/products", viewsRouter)
    app.use('/',(req,res) => res.render('index',{name:'Francisco Javier Fariña'}))
    io.on("connection", async socket => {
    console.log('Nuevo Cliente Conectado !!',socket.id)
    socket.on("productList", data => {
    io.emit("updatedProducts", data)
  })

  let messages = await messageModel.find()

  socket.broadcast.emit("alert");
  socket.emit("logs", messages);
  socket.on("message", async (data) => {
    messages.push(data);
    await messageModel.create(data)
    io.emit("logs", messages)
  })
  
})

} catch(err) {
    console.log(err.message)
}


