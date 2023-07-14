import {Server} from 'socket.io'

const init =(httpServer) =>{
    
    const io = new Server(httpServer)

    io.on('connection', socket =>{
        console.log('Nuevo Cliente Conectado !!',socket.id)
    }) 

    // io.emit('addProduct',(data)=>{
    //     console.log(data);
    //  }) 

    return io
}

export default init



