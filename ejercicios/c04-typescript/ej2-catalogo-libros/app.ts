interface Libro {
    isbn: string;
    titulo: string;
    autor: string;
    precio: number;
    disponible: boolean;
    genero?: string;
}

let catalogo: Libro[] = [
    { isbn: '1', titulo: 'El Quijote', autor: 'Cervantes', precio: 1000, disponible: true },
    { isbn: '2', titulo: '1984', autor: 'Orwell', precio: 1500, disponible: false },
    { isbn: '3', titulo: 'Rayuela', autor: 'Cortázar', precio: 1200, disponible: true },
    { isbn: '4', titulo: 'Cien años de soledad', autor: 'García Márquez', precio: 1800, disponible: true, genero: 'Novela' },
    { isbn: '5', titulo: 'Fahrenheit 451', autor: 'Bradbury', precio: 1400, disponible: true, genero: 'Ciencia ficción' },
    { isbn: '6', titulo: 'Orgullo y prejuicio', autor: 'Austen', precio: 1600, disponible: false, genero: 'Romance' },
    { isbn: '7', titulo: 'La metamorfosis', autor: 'Kafka', precio: 1100, disponible: true, genero: 'Ficción' }
]

const buscarPorAutor = (autor: string): Libro[] => {
    let resultado: Libro[] = [];
    let j: number = 0;

    for (let i = 0; i < catalogo.length; i++){
        const libro = catalogo[i];

        if (libro.autor.toLowerCase() === autor.toLowerCase()){
            resultado[j] = libro;
            j++;
        }
    }

    return resultado;
};

const librosDisponibles = (): Libro[] => {
    let resultado: Libro[] = [];
    let j: number = 0;

    for (let i = 0; i < catalogo.length; i++){
        const libro = catalogo[i];

        if (libro.disponible == true){
            resultado[j] = libro;
            j++;
        }
    }
    return resultado;
};

const precioPromedio = (libros: Libro[]): number => {
    if (libros.length === 0) return 0;

    let sumaPrecio: number = 0;

    for (let i = 0; i < libros.length; i++){
        const libro = libros[i];
        sumaPrecio = (sumaPrecio + libro.precio);
    }

    let precioPromedio = (sumaPrecio / libros.length).toFixed(2);
    return Number(precioPromedio);
};

const renderizar = (libros: Libro[]): void => {
    const ul = document.querySelector('#listado') as HTMLElement;
    const stats = document.querySelector('#stats') as HTMLElement;

    // limpiar lista
    ul.innerHTML = '';

    // recorrer libros
    for (let i = 0; i < libros.length; i++){
        const libro = libros[i];

        const li = document.createElement('li');
        li.textContent = libro.titulo + ' - ' + libro.autor + ' - $' + libro.precio;

        ul.appendChild(li);
    }

    // stats
    const cantidad = libros.length;
    const promedio = precioPromedio(libros);

    stats.textContent = 'Cantidad: ' + cantidad + ' | Promedio: $' + promedio;
};


const input = document.querySelector('#filtroAutor') as HTMLInputElement;
const btnFiltrar = document.querySelector('#filtrar') as HTMLButtonElement;
const btnDisponibles = document.querySelector('#mostrarDisponibles') as HTMLButtonElement;
const btnTodos = document.querySelector('#mostrarTodos') as HTMLButtonElement;

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