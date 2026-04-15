const inputProducto = document.querySelector('#producto');
const botonAgregar = document.querySelector('#botonAgregar');
const listaProductos = document.querySelector('#listaProductos');
const contador = document.querySelector('#contador');

botonAgregar.addEventListener('click', () => {
    const producto = inputProducto.value;

    if (producto === '') {
        contador.textContent = 'Error: ingresá un producto';
        return;
    }

    const li = document.createElement('li');
    li.textContent = producto;

    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Eliminar';

    botonEliminar.addEventListener('click', () => {
        li.remove();
        actualizarContador();
    });

    li.appendChild(botonEliminar);
    listaProductos.appendChild(li);

    inputProducto.value = '';
    actualizarContador();
});

const actualizarContador = () => {
    const cantidad = listaProductos.children.length;
    contador.textContent = `${cantidad} productos en la lista`;
};