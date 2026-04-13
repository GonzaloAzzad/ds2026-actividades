const clasificarNota = (nota) => {
    if (nota >= 1 && nota < 4){
        console.log("Desaprobado");
    }
    else if (nota >= 4 && nota <= 7){
        console.log("Aprobado");
    }
    else if (nota > 7){
        console.log("Promocionado");
    }
    else {
        console.log("Nota inválida");
    }
}

const diaDeLaSemana = (num) => {
    switch(num){
        case 1: console.log("Lunes");
        break;
        case 2: console.log("Martes");
        break;
        case 3: console.log("Miercoles");
        break;
        case 4: console.log("Jueves");
        break;
        case 5: console.log("Viernes");
        break;
        case 6: console.log("Sabado - Fin de semana");
        break;
        case 7: console.log("Domingo - Fin de semana");
        break;
        default: console.log("Día inválido");
    }
}

clasificarNota(3);
clasificarNota(6);
clasificarNota(9);

diaDeLaSemana(2);
diaDeLaSemana(4);
diaDeLaSemana(6);
diaDeLaSemana(8);