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

clasificarNota(3);
clasificarNota(6);
clasificarNota(9);