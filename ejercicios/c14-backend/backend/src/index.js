import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

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

app.get('/', (req, res) => {
  res.json({ message: 'API de La Librería funcionando 🐳' })
})

app.get('/libros', (req, res) => {
  res.json(libros)
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
})