document.addEventListener('DOMContentLoaded', () => {
  mostrarProductosCarrito();
});

// Agregar productos al carrito
function agregarProductoCarrito(producto) {
  let productosCarrito = JSON.parse(localStorage.getItem('productosCarrito')) || [];
  const productoExistente = productosCarrito.find(item => item.nombre === producto.nombre);

  if (productoExistente) {
    productoExistente.cantidad += 1;
  } else {
    const nuevoProducto = {
      ...producto,
      cantidad: 1
    };
    productosCarrito.push(nuevoProducto);
  }

  localStorage.setItem('productosCarrito', JSON.stringify(productosCarrito));
}

function mostrarProductosCarrito() {
  const carritoItems = document.getElementById('carrito-items');
  const totalCompra = document.getElementById('total-compra');
  const productosCarrito = JSON.parse(localStorage.getItem('productosCarrito')) || [];
  carritoItems.innerHTML = '';

  if (productosCarrito.length === 0) {
    const carVacioMensaje = document.createElement('div');
    carVacioMensaje.textContent = 'El carrito está vacío';
    carritoItems.appendChild(carVacioMensaje);

    totalCompra.textContent = '$0';
  } else {
    let total = 0;

    for (const producto of productosCarrito) {
      const carItem = document.createElement('div');
      carItem.classList.add('carrito-items');

      const nombreCantidad = document.createElement('div');
      nombreCantidad.textContent = `${producto.nombre}`;
      carItem.appendChild(nombreCantidad);

      const nombreCantidad2 = document.createElement('div');
      nombreCantidad2.textContent = `${producto.cantidad}u`;
      carItem.appendChild(nombreCantidad2);

      const precioTotal = document.createElement('div');
      const totalProducto = producto.precio * producto.cantidad;
      precioTotal.textContent = `$${totalProducto}`;
      carItem.appendChild(precioTotal);

      const eliminarButton = document.createElement('button');
      eliminarButton.textContent = 'Eliminar';
      eliminarButton.addEventListener('click', () => {
        eliminarProductoCarrito(producto);
      });
      carItem.appendChild(eliminarButton);

      carritoItems.appendChild(carItem);

      total += totalProducto;
    }

    totalCompra.textContent = `$${total}`;
  }
}

// Eliminar productos del carrito
function eliminarProductoCarrito(producto) {
  let productosCarrito = JSON.parse(localStorage.getItem('productosCarrito')) || [];
  productosCarrito = productosCarrito.filter(item => item.nombre !== producto.nombre);
  localStorage.setItem('productosCarrito', JSON.stringify(productosCarrito));
  mostrarProductosCarrito();
}

// Vaciar carrito
const buttonVaciarCarrito = document.getElementById('vaciar-carrito');
buttonVaciarCarrito.addEventListener('click', () => {
  localStorage.removeItem('productosCarrito');
  mostrarProductosCarrito();
});

// Finalizar compra
const buttonFinalizarCompra = document.getElementById('finalizar-compra');
buttonFinalizarCompra.addEventListener('click', () => {
  const totalCompra = document.getElementById('total-compra');
  const total = totalCompra.textContent;

  if (total === '$0') {
    Swal.fire({
      icon: 'error',
      title: 'Carrito vacío',
      text: 'No hay productos en tu carrito',
    });
  } else {
    Swal.fire({
      icon: 'success',
      title: 'Gracias por su compra',
      text: `El total a pagar es de ${total}`,
    }).then(() => {
      localStorage.removeItem('productosCarrito');
      mostrarProductosCarrito();
    });
  }
});
