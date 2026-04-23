"use strict";
const inputAltura = document.querySelector('#altura');
const botonGenerar = document.querySelector('#botonGenerar');
const resultado = document.querySelector('#resultado');
const generarAsteriscos = (n) => {
    let string = '';
    for (let i = 0; i < n; i++) {
        string = string + '*';
    }
    return string;
};
botonGenerar.addEventListener('click', () => {
    const altura = Number(inputAltura.value); //Obtengo la altura
    if (inputAltura.value === '' || altura < 1) {
        resultado.textContent = 'Error: ingresá un número mayor o igual a 1';
        return;
    }
    let arbol = '';
    for (let i = 1; i <= altura; i++) {
        arbol = arbol + generarAsteriscos(i) + '\n';
    }
    resultado.textContent = arbol;
});
