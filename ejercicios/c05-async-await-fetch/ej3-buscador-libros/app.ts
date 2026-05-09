interface LibroOL {
    title: string;
    author_name?: string[];
    first_publish_year?: number;
}

async function buscarLibros(query: string): Promise<LibroOL[]> {
    const response = await fetch(`https://openlibrary.org/search.json?q=${query}`);

    if (!response.ok) {
        throw new Error("Error en la API");
    }

    const data = await response.json();
    return data.docs;
}

const boton = document.getElementById("btnBuscar") as HTMLButtonElement;

boton.addEventListener("click", async () => {
    const input = document.getElementById("busqueda") as HTMLInputElement;
    const error = document.getElementById("error") as HTMLElement;

    const texto = input.value.trim();

    if (texto === "") {
        error.textContent = "Ingrese un término de búsqueda";
        return;
    }

    error.textContent = "";

    try {
        const libros = await buscarLibros(texto);
        mostrarLibros(libros.slice(0, 10));
    } catch {
        error.textContent = "Error al buscar libros";
    }
});

function mostrarLibros(libros: LibroOL[]): void {
    const contenedor = document.getElementById("resultados") as HTMLElement;
    contenedor.innerHTML = "";

    libros.forEach(libro => {
        const div = document.createElement("div");

        div.innerHTML = `
            <h3>${libro.title}</h3>
            <p>${libro.author_name ? libro.author_name[0] : "Autor desconocido"}</p>
            <p>${libro.first_publish_year ?? "Año desconocido"}</p>
            <p>--------------------------------------------------------------</p>
        `;

        contenedor.appendChild(div);
    });
}