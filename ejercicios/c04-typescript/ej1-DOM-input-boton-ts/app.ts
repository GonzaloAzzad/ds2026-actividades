const inputAltura = document.querySelector('#altura') as HTMLInputElement;
const botonGenerar = document.querySelector('#botonGenerar') as HTMLButtonElement;
const resultado = document.querySelector('#resultado') as HTMLElement;

const generarAsteriscos = (n: number): string => {
    let string = '';

    for (let i = 0; i < n; i++) {
        string = string + '*';
    }

    return string;
};

botonGenerar.addEventListener('click', () => {  //Detecto el click sobre el botón
    const altura: number = Number(inputAltura.value);   //Obtengo la altura

    if (inputAltura.value === '' || altura < 1) {
        resultado.textContent = 'Error: ingresá un número mayor o igual a 1';
        return;
    }

    let arbol: string = '';

    for (let i = 1; i <= altura; i++) {
        arbol = arbol + generarAsteriscos(i) + '\n';
    }

    resultado.textContent = arbol;
});