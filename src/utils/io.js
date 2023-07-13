import {Server} from 'socket.io'

const init =(httpServer) =>{
    const io = new Server(httpServer)
    io.on('connection', socket =>{
        console.log('Nuevo Cliente Conectado !!',socket.id)
    io.emit('mensajebackend','Mensaje desde el SERVIDOR') 
    })
    
    return io
}

export default init