import {Server} from 'socket.io'

const init =(httpServer) =>{
    
    const io = new Server(httpServer)

    return io
}

export default init



