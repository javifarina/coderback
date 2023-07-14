//Desafío N2 BACKEND CODER - Francsico JAvier Fariña
import express from 'express'
import productRouter from '../routers/productRouter.js'
import cartRouter from '../routers/cartRouter.js'
import viewsRouterFn from '../routers/viewsRouter.js'
import { engine } from 'express-handlebars';
import socketServer from './utils/io.js'


const app  = express()
//handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(express.static('./public'));
//Express
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
const PORT=8080 || 8089
const httpServer=app.listen(PORT,()=>{
    console.log(`Servidor corriento en http://localhost:${PORT}`)
})
const io = socketServer(httpServer)

const viewsRouter=viewsRouterFn(io)
//Rutas
app.use('/api/',productRouter)
app.use('/api/',cartRouter)
app.use('/',viewsRouter)

