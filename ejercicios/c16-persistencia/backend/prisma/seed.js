import { prisma } from "../src/config/prisma.js";

const libros = [
  {
    titulo: "El Señor de los Anillos",
    autor: "J.R.R. Tolkien",
    genero: "Fantasía",
    descripcion: "Un hobbit emprende un viaje para destruir un anillo de poder.",
    imagen: "https://covers.openlibrary.org/b/id/8231856-L.jpg",
  },
  {
    titulo: "Fundación",
    autor: "Isaac Asimov",
    genero: "Ciencia ficción",
    descripcion: "Un matemático predice la caída del Imperio Galáctico.",
    imagen: "https://covers.openlibrary.org/b/id/8474077-L.jpg",
  },
  {
    titulo: "Cien Años de Soledad",
    autor: "Gabriel García Márquez",
    genero: "Realismo mágico",
    descripcion: "La saga de la familia Buendía en el pueblo de Macondo.",
    imagen: "https://covers.openlibrary.org/b/id/8231990-L.jpg",
  },
];

const autores = [
  { nombre: "J.R.R. Tolkien", nacionalidad: "Británico", biografia: "Filólogo y escritor, autor de El Señor de los Anillos." },
  { nombre: "Isaac Asimov", nacionalidad: "Estadounidense", biografia: "Bioquímico y prolífico escritor de ciencia ficción." },
  { nombre: "Gabriel García Márquez", nacionalidad: "Colombiano", biografia: "Premio Nobel de Literatura, referente del realismo mágico." },
];

async function main() {
  await prisma.libro.createMany({ data: libros });
  await prisma.autor.createMany({ data: autores });
}

main();