const numeros = [1, 2, 3, 4, 8, 7, 6, 5];
let suma = 0;
let mayor = numeros[0];
let menor = numeros[0];

for (let i = 0; i < numeros.length; i++){
    suma = suma + numeros[i];
    
    if (numeros[i] > mayor){
        mayor = numeros[i];
    }

    if (numeros[i] < menor){
        menor = numeros[i];
    }
}

let promedio = suma/numeros.length;

console.log(`Suma total: ${suma}`);
console.log(`Promedio: ${promedio}`);
console.log(`Mayor: ${mayor}`);
console.log(`Menor: ${menor}`);

const generarAsteriscos = (n) => {
    let string = '';

    for (let i = 0; i < n; i++){
        string = string + '*';
    }
    return string;
}

console.log(generarAsteriscos(3));
console.log(generarAsteriscos(10));