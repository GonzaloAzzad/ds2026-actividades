"use strict";
let catalogo = [
    { isbn: '1', titulo: 'El Quijote', autor: 'Cervantes', precio: 1000, disponible: true },
    { isbn: '2', titulo: '1984', autor: 'Orwell', precio: 1500, disponible: false },
    { isbn: '3', titulo: 'Rayuela', autor: 'Cortázar', precio: 1200, disponible: true }
];
const buscarPorAutor = (autor) => {
    let resultado = [];
    let j = 0;
    for (let i = 0; i < catalogo.length; i++) {
        const libro = catalogo[i];
        if (libro.autor.toLowerCase() === autor.toLowerCase()) {
            resultado[j] = libro;
            j++;
        }
    }
    return resultado;
};
const librosDisponibles = () => {
    let resultado = [];
    let j = 0;
    for (let i = 0; i < catalogo.length; i++) {
        const libro = catalogo[i];
        if (libro.disponible == true) {
            resultado[j] = libro;
            j++;
        }
    }
    return resultado;
};
const precioPromedio = (libros) => {
    if (libros.length === 0)
        return 0;
    let sumaPrecio = 0;
    for (let i = 0; i < libros.length; i++) {
        const libro = libros[i];
        sumaPrecio = (sumaPrecio + libro.precio);
    }
    let precioPromedio = (sumaPrecio / libros.length).toFixed(2);
    return Number(precioPromedio);
};
//ABM DE LIBROS
const agregarLibro = (libro) => {
    catalogo[catalogo.length] = libro;
    renderizar(catalogo);
};
const eliminarLibro = (isbn) => {
    let nuevoCatalogo = [];
    let j = 0;
    for (let i = 0; i < catalogo.length; i++) {
        if (catalogo[i].isbn !== isbn) {
            nuevoCatalogo[j] = catalogo[i];
            j++;
        }
    }
    catalogo = nuevoCatalogo;
    renderizar(catalogo);
};
// RENDERIZADO
const renderizar = (libros) => {
    const ul = document.querySelector('#listado');
    const stats = document.querySelector('#stats');
    // limpiar lista
    ul.innerHTML = '';
    // recorrer libros
    for (let i = 0; i < libros.length; i++) {
        const libro = libros[i];
        const li = document.createElement('li');
        li.textContent = libro.titulo + ' - ' + libro.autor + ' - $' + libro.precio;
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.addEventListener('click', () => {
            eliminarLibro(libro.isbn);
        });
        li.appendChild(botonEliminar);
        ul.appendChild(li);
    }
    // stats
    const cantidad = libros.length;
    const promedio = precioPromedio(libros);
    stats.textContent = 'Cantidad: ' + cantidad + ' | Promedio: $' + promedio;
};
const input = document.querySelector('#filtroAutor');
const btnFiltrar = document.querySelector('#filtrar');
const btnDisponibles = document.querySelector('#mostrarDisponibles');
const btnTodos = document.querySelector('#mostrarTodos');
//filtrar
btnFiltrar.addEventListener('click', () => {
    const resultado = buscarPorAutor(input.value);
    renderizar(resultado);
});
//disponibles
btnDisponibles.addEventListener('click', () => {
    renderizar(librosDisponibles());
});
//todos
btnTodos.addEventListener('click', () => {
    renderizar(catalogo);
});
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const libro = validarFormulario();
    if (libro === null)
        return;
    agregarLibro(libro);
    form.reset();
});
const validarFormulario = () => {
    const titulo = document.querySelector('#titulo').value;
    const autor = document.querySelector('#autor').value;
    const precioStr = document.querySelector('#precio').value;
    const disponible = document.querySelector('#disponible').checked;
    const genero = document.querySelector('#genero').value;
    const errorDiv = document.querySelector('#errorForm');
    if (titulo === '' || autor === '' || precioStr === '') {
        errorDiv.textContent = 'Todos los campos obligatorios deben completarse';
        return null;
    }
    const precio = Number(precioStr);
    if (precio <= 0) {
        errorDiv.textContent = 'El precio debe ser mayor a 0';
        return null;
    }
    errorDiv.textContent = '';
    return {
        isbn: 'AUTO-' + Date.now(),
        titulo,
        autor,
        precio,
        disponible,
        genero
    };
};
