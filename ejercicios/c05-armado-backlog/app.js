"use strict";
async function obtenerUsuarios() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        const usuarios = await response.json();
        return usuarios;
    }
    catch (error) {
        console.error('Error al obtener usuarios:', error);
        return [];
    }
}
function mostrarUsuarios(usuarios) {
    usuarios.forEach(usuario => {
        console.log(`${usuario.name} - ${usuario.email}`);
    });
}
async function init() {
    const usuarios = await obtenerUsuarios();
    mostrarUsuarios(usuarios);
}
init();
