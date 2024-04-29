
const express = require("express")
const mongoose = require('mongoose')
const expressHandlebars = require('express-handlebars')
const handlebars = expressHandlebars.create({
    defaultLayout: "main",
    handlebars: require("handlebars"),
    runtimeOptions: {
        allowProtoPropertiesByDefault: true
    }
})

const { dbName,URI } = require("./config/dbConfig")
const sessionMiddleware = require('./session/mongoStorage')

/**Importar Passport  */
const passport = require('passport')
const inicializeStratrgy = require('./config/passport.config')

const { Server } = require('socket.io')

/**Manager de Chat */
const ChatManager = require('../src/dao/dbManager/chatManager')
const chatManager = new ChatManager()

/* Routers*/
const productRouter = require('../routers/productRouter')
const cartRouter = require('../routers/cartRouter')
const viewsRouter = require('../routers/viewRouter')
const sesionRouter = require('../routers/sessionRouter')


/* Express  variables estaticas*/
const app = express()
const PORT = 8080
app.use(express.static(`${__dirname}../../public`))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
/** Sesions */
app.use(sessionMiddleware)
/**Conecta passport con nuestra Logica */
inicializeStratrgy()
app.use(passport.initialize())
app.use(passport.session())


/* Plantillas Handlebars */
app.engine('handlebars',handlebars.engine)
app.set('views',`${__dirname}/views`)
app.set('view engine', 'handlebars')


/* Rutas */
app.use('/api/',productRouter)
app.use('/api/',cartRouter)
app.use('/',viewsRouter)
app.use('/api/sessions', sesionRouter)



const main = async () =>{
/* Configuracion del Servidor http */
    app.listen(PORT,() =>{
    console.log(`Server ON http://localhost:${PORT}`)
     mongoose.connect(URI,{dbName})
    .then(() =>{
        console.log('Server DB Ok')
    })
    
})
}
main()