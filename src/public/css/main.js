
const socket = io()
// console.log(socket)
//socket.emit('mi_mensaje','Primer Mensaje enviado del Cliente' )
//socket.emit('mensajebackend',"hola desde js")
socket.on('addProduct',(data)=>{
    const dataio =JSON.parse(data)
   console.log(dataio)
   
  
})










