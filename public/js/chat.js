const socket = io()
let username
const chatBox = document.getElementById('chatBox')
const messageLogs = document.getElementById('messageLogs')
Swal.fire({
    title:"Ingresa un Usuario",
    input:"text",
    text:"Debes Identificar primero",
    inputValidator:(value)=>{
        return !value && 'Ingresa un nombre de usuario'
    },
    allowOutsideClick:false

}).then(result =>{
    username = result.value
    //Notificamos al server
    socket.emit('user-connected',username)
   
})

//escuchar el evento enter
chatBox.addEventListener('keyup', event =>{
    if(event.key==='Enter'){
        const text =chatBox.value
        if(text.trim().length > 0){
            socket.emit('message', {username, text})
            chatBox.value=''
        }
    }
})

//escuchar mensajes del servidor 
socket.on('message',(data)=>{
    const{username,text} = data
    messageLogs.innerHTML+= ` <strong>${username}</strong> dice:  <em> ${text} </em></br>`
})

//escucha nuevo usuario en el chat

socket.on('user-joined-chat',(username)=>{
    Swal.fire({
        text:`Un nuevo usuario se agregó a la sala: ${username}`,
        Toast:true,
        position:'top-right'
         
    })
})