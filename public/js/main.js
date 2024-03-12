

//JS del lado del Cliente
const socket = io()
socket.on('newProduct',(product)=>{
    console.log(product)
    //agragar nuevo producto
    let tbod = document.getElementById('productFeed')
    tbod.innerHTML+=`
    <tr >
    <td>${product.code}</td>
    <td>${product.title}</td>
    <td>${product.description}</td>
    <td>${product.category}</td>
    <td>${product.price}</td>
    </tr >
    `
})
