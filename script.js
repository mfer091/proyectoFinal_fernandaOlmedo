document.addEventListener('DOMContentLoaded', function() {
  obtenerProductos();
});

// Mostrar productos en la página
function obtenerProductos() {
  fetch("./productos.json")
    .then(response => response.json())
    .then(data => {
      mostrarProductos(data);
    })
}

function mostrarProductos(productosMostrar) {
  const main = document.querySelector('main');
  main.innerHTML = '';

  for (const producto of productosMostrar) {
    const productoDiv = document.createElement('div');
    productoDiv.classList.add('producto');

    const imagen = document.createElement('img');
    imagen.src = producto.imagen;
    productoDiv.appendChild(imagen);

    const nombre = document.createElement('div');
    nombre.textContent = producto.nombre;
    productoDiv.appendChild(nombre);

    const precio = document.createElement('div');
    precio.textContent = `$${producto.precio}`;
    productoDiv.appendChild(precio);

    const agregarACarrito = document.createElement('button');
    agregarACarrito.textContent = 'Agregar a Carrito';
    agregarACarrito.addEventListener('click', () => {
      agregarProductoCarrito(producto);
    });
    productoDiv.appendChild(agregarACarrito);

    main.appendChild(productoDiv);
  }
}

// Filtrar productos por categoría
document.getElementById('todos').addEventListener('click', (event) => {
  event.preventDefault();
  obtenerProductos();
});

document.getElementById('partes-arriba').addEventListener('click', (event) => {
  event.preventDefault();
  fetch("./productos.json")
    .then(response => response.json())
    .then(data => {
      const productosFiltrados = data.filter(producto => producto.categoria === 'arriba');
      mostrarProductos(productosFiltrados);
    });
});

document.getElementById('partes-abajo').addEventListener('click', (event) => {
  event.preventDefault();
  fetch("./productos.json")
    .then(response => response.json())
    .then(data => {
      const productosFiltrados = data.filter(producto => producto.categoria === 'abajo');
      mostrarProductos(productosFiltrados);
    });
});
