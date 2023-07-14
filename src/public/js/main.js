
const socket = io()
// console.log(socket)
//socket.emit('mi_mensaje','Primer Mensaje enviado del Cliente' )
//socket.emit('mensajebackend',"hola desde js")
var contenedor = document.getElementById("contenedorProductos");
socket.on('addProduct',(data)=>{
    const productos =JSON.parse(data)
    
  for (var i = 0; i < productos.length; i++) {
    var producto = productos[i];
  
    // Crea los elementos HTML para cada producto
    var elementoProducto = document.createElement("div");
    var tituloProducto = document.createElement("h3");
    var descripcionProducto = document.createElement("p");
    var precioProducto = document.createElement("p");
    var imagenProducto = document.createElement("img");
  
    // Establece los atributos y contenido de los elementos
    tituloProducto.textContent = producto.title;
    descripcionProducto.textContent = producto.description;
    precioProducto.textContent = "Precio: $" + producto.price.toFixed(2);
    //imagenProducto.src = producto.thumbnail;
    imagenProducto.alt = producto.title;
  
    // Agrega los elementos al elemento del producto
    elementoProducto.appendChild(tituloProducto);
    elementoProducto.appendChild(descripcionProducto);
    elementoProducto.appendChild(precioProducto);
    elementoProducto.appendChild(imagenProducto);
  
    // Agrega el elemento del producto al contenedor principal
    contenedor.appendChild(elementoProducto);
  }
})

  












