const libros = [
  {
    id: 1,
    titulo: "El Señor de los Anillos",
    autor: "J.R.R. Tolkien",
    genero: "Fantasía",
    descripcion: "Un hobbit emprende un viaje para destruir un anillo de poder.",
    imagen: "https://covers.openlibrary.org/b/id/8231856-L.jpg"
  },
  {
    id: 2,
    titulo: "Fundación",
    autor: "Isaac Asimov",
    genero: "Ciencia ficción",
    descripcion: "Un matemático predice la caída del Imperio Galáctico.",
    imagen: "https://covers.openlibrary.org/b/id/8474077-L.jpg"
  },
  {
    id: 3,
    titulo: "Cien Años de Soledad",
    autor: "Gabriel García Márquez",
    genero: "Realismo mágico",
    descripcion: "La saga de la familia Buendía en el pueblo de Macondo.",
    imagen: "https://covers.openlibrary.org/b/id/8231990-L.jpg"
  }
]
let proximoId = 4

export function findAll(genero) {
  if (!genero) return libros
  return libros.filter(l => l.genero.toLowerCase() === genero.toLowerCase())
}

export function findById(id) {
  return libros.find(l => l.id === id)
}

export function create(datos) {
  const nuevo = { id: proximoId++, ...datos }
  libros.push(nuevo)
  return nuevo
}

export function update(id, datos) {
  const index = libros.findIndex(l => l.id === id)
  if (index === -1) return undefined
  libros[index] = { ...libros[index], ...datos, id }
  return libros[index]
}

export function remove(id) {
  const index = libros.findIndex(l => l.id === id)
  if (index === -1) return false
  libros.splice(index, 1)
  return true
}