import fs from 'fs'
export default class CartManagaer {
    constructor(path){
        this.path=path
    }
   
    getCarts(){
        return fs.promises.readFile(this.path, 'utf-8')
            .then((stringCarts) => {
                const carts = JSON.parse(stringCarts)
                return carts
            })
            .catch(error => {
                console.log('Error Lectura del archivo')
                return []
            })
    }
   
    addCart(){ 
        const newCart={
            product:[]
        }

       return this.getCarts()
       .then((carts) =>{
            newCart.id=carts.length +1
            carts.push(newCart)
            return fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2))
            
       })
       .catch((error) => {
        console.log("Error al guardar el Producto")
        return error
    })
    
    }

    getCartByID(id){
        return this.getCarts()
        .then((carts) =>{
            const cartsById =carts.find((e) => e.id===id)
           // console.log(cartsById)
              if (!cartsById){
                   throw new Error(`No existe Carrito ID: '${id}'`)
             }
             return cartsById
        })
    //     .catch((error) => {
    //         console.log("Error al guardar el Producto")
    //         return error
    // }) 
    
}
    setCart(data){
     fs.promises.writeFile(this.path, JSON.stringify(data, null, 2))
       .then(()=>{console.log("guardado")})  
       .catch(()=>{console.log("No save")}) 
    } 
}