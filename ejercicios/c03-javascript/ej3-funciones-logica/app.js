const calcularPrecioFinal = (monto, medioPago) => {
    let montoFinal = 0;

    if (monto < 200){
        montoFinal = monto;
    }
    else if (monto >= 200 && monto <= 400){
        if (medioPago === 'E'){
            montoFinal = (monto * 0.7);
        }
        else if (medioPago === 'D'){
            montoFinal = (monto * 0.8);
        }
        else if (medioPago === 'C'){
            montoFinal = (monto * 0.9);
        }
    }

    else if (monto > 400){
        montoFinal = (monto * 0.6);
    }

    console.log(`Monto: ${monto} | Medio de pago: ${medioPago} | Monto final: ${montoFinal}`);
}


calcularPrecioFinal(100, 'E');
calcularPrecioFinal(600, 'C');
calcularPrecioFinal(300, 'E');
calcularPrecioFinal(350, 'D');
calcularPrecioFinal(500, 'E');