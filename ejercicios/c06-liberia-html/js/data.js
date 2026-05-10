"use strict";

async function buscarLibros(query) {
    const response = await fetch(`https://openlibrary.org/search.json?q=${query}`);
    if (!response.ok) {
        throw new Error("Error en la API");
    }
    const data = await response.json();
    return data.docs;
}

function mostrarLibros(libros) {
    const contenedor = document.getElementById("resultados");
    contenedor.innerHTML = "";

    libros.forEach(libro => {
        const col = document.createElement("div");
        col.className = "col";
        col.innerHTML = `
            <div class="card h-100">
                <div class="card-body">
                    <h5 class="card-title">${libro.title}</h5>
                    <p class="card-text text-muted">${libro.author_name ? libro.author_name[0] : "Autor desconocido"}</p>
                    <p class="card-text">${libro.first_publish_year ?? "Año desconocido"}</p>
                </div>
            </div>
        `;
        contenedor.appendChild(col);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const boton = document.getElementById("btnBuscar");
    const error = document.getElementById("error");

    boton.addEventListener("click", async () => {
        const input = document.getElementById("busqueda");
        const texto = input.value.trim();

        if (texto === "") {
            error.textContent = "Ingresá un término de búsqueda";
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
});