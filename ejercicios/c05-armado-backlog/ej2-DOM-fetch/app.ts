    interface Usuario {
        id: number;
        name: string;
        email: string;
        phone: string;
}

async function obtenerUsuarios(): Promise<Usuario[]> {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        const usuarios: Usuario[] = await response.json();
        return usuarios;
    } catch (error){
        console.error('Error al obtener usuarios:', error);
        throw error;
    }
}

function mostrarUsuarios(usuarios: Usuario[]): void {
    const listado = document.getElementById("listado") as HTMLElement;

    usuarios.forEach(usuario => {
        const li = document.createElement("li");
        li.textContent = `${usuario.name} - ${usuario.email}`;
        listado.appendChild(li);
    });
}

async function init() {
    const loading = document.getElementById("loading") as HTMLElement;
    const error = document.getElementById("error") as HTMLElement;

    try {
        loading.style.display = "block";

        const usuarios = await obtenerUsuarios();

        loading.style.display = "none";
        mostrarUsuarios(usuarios);

    }
    catch (e){
        loading.style.display = "none";
        error.textContent = "Error al cargar usuarios";
    }
}

init();