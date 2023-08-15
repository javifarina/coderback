

  function deleteProduct(productId) {
    fetch(`/api/carts/cartId/product/${productId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
       
        console.log('Producto eliminado:', data);
       
      })
      .catch(error => {
       
        console.error('Error al eliminar el producto:', error);
       
      });
  }