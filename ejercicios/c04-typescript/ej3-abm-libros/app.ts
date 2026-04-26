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
    { isbn: '3', titulo: 'Rayuela', autor: 'Cortázar', precio: 1200, disponible: true }
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

//ABM DE LIBROS
const agregarLibro = (libro: Libro): void => {
    catalogo[catalogo.length] = libro;
    renderizar(catalogo);
}

const eliminarLibro = (isbn: string): void => {
    let nuevoCatalogo: Libro[] = [];
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
const renderizar = (libros: Libro[]): void => {
    const ul = document.querySelector('#listado') as HTMLElement;
    const stats = document.querySelector('#stats') as HTMLElement;

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

const form = document.querySelector('form') as HTMLFormElement;

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const libro = validarFormulario();

    if (libro === null) return;

    agregarLibro(libro);
    form.reset();
});

const validarFormulario = (): Libro | null => {
    const titulo = (document.querySelector('#titulo') as HTMLInputElement).value;
    const autor = (document.querySelector('#autor') as HTMLInputElement).value;
    const precioStr = (document.querySelector('#precio') as HTMLInputElement).value;
    const disponible = (document.querySelector('#disponible') as HTMLInputElement).checked;
    const genero = (document.querySelector('#genero') as HTMLInputElement).value;

    const errorDiv = document.querySelector('#errorForm') as HTMLElement;

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

