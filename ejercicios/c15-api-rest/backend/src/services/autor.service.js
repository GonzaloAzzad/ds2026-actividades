const autores = [
  { id: 1, nombre: "J.R.R. Tolkien", nacionalidad: "Británico", biografia: "Filólogo y escritor, autor de El Señor de los Anillos." },
  { id: 2, nombre: "Isaac Asimov", nacionalidad: "Estadounidense", biografia: "Bioquímico y prolífico escritor de ciencia ficción." },
  { id: 3, nombre: "Gabriel García Márquez", nacionalidad: "Colombiano", biografia: "Premio Nobel de Literatura, referente del realismo mágico." }
]
let proximoId = 4

export function findAll(nacionalidad) {
  if (!nacionalidad) return autores
  return autores.filter(a => a.nacionalidad.toLowerCase() === nacionalidad.toLowerCase())
}

export function findById(id) {
  return autores.find(a => a.id === id)
}

export function create(datos) {
  const nuevo = { id: proximoId++, ...datos }
  autores.push(nuevo)
  return nuevo
}

export function update(id, datos) {
  const index = autores.findIndex(a => a.id === id)
  if (index === -1) return undefined
  autores[index] = { ...autores[index], ...datos, id }
  return autores[index]
}

export function remove(id) {
  const index = autores.findIndex(a => a.id === id)
  if (index === -1) return false
  autores.splice(index, 1)
  return true
}