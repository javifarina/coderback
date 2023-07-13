
const socket = io()
// console.log(socket)
//socket.emit('mi_mensaje','Primer Mensaje enviado del Cliente' )
socket.on('mensajebackend',(data)=>{
    console.log(data)
})
// socket.on('nuevoProducto',(data)=>{
//     const producto = JSON.parse(data)
// })