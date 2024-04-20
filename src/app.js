
const express = require("express")
const expressHandlebars = require('express-handlebars')
const handlebars = expressHandlebars.create({
    defaultLayout: "main",
    handlebars: require("handlebars"),
    runtimeOptions: {
        allowProtoPropertiesByDefault: true
    }
})

const mongoose = require('mongoose')
const { Server } = require('socket.io')

/**Manager de Chat */
const ChatManager = require('../src/dao/dbManager/chatManager')
const chatManager = new ChatManager()

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
app.engine('handlebars',handlebars.engine)
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
/**
 * Configurar la conexion de BD
 */
await mongoose.connect('mongodb+srv://CoderUserfrancisco:LpTzC7ytZ9dDWMNN@cluster0.shjdpcd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',{
    dbName:'ecommerce'
})
/* configuracion Servidor WS 
const wsServer = new Server(httpServer)
app.set('ws',wsServer)


wsServer.on('connection',(ClientSocket) =>{
    console.log(`Cliente Conectado, ID : ${ClientSocket.id}`)
})
wsServer.on('connection',(ClientChat)=>{
      
    console.log(`Cliente de chat conectado Id: ${ClientChat.id}`)
  
    ClientChat.on('message',(data)=>{
        const newData ={
            user:data.username,
            message:data.text
        }
        chatManager.saveMessage(newData)
        wsServer.emit('message', data)
    })
    //notificar mensajes a usuarios nuevos
     chatManager.getMessage()
        .then((mensaje)=>{
          
            for(let e of mensaje){
                const data ={
                    username:e.user,
                    text:e.message
                }
                ClientChat.emit('message',data)
            }
        
        })
 
   //Notificar a las salas usuario nuevo
   ClientChat.on('user-connected',(username) =>{
        ClientChat.broadcast.emit('user-joined-chat',username)
   })
})
*/



}
main()