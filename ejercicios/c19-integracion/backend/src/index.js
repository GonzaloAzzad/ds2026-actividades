import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js'
import libroRoutes from './routes/libro.routes.js'
import autorRoutes from './routes/autor.routes.js'
import { errorHandler } from './middlewares/error.middleware.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

const corsOptions = {
  origin: [process.env.FRONTEND_URL ?? 'http://localhost:5173'],
}

app.use(cors(corsOptions)) // ← 1º, ANTES de json() y de las rutas
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'API de La Librería funcionando 🐳' })
})

app.use('/api/auth', authRoutes)
app.use('/api/libros', libroRoutes)
app.use('/api/autores', autorRoutes)

// 404 en JSON — antes del errorHandler, después de las rutas (punto 9)
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' })
})

app.use(errorHandler) // siempre al final

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
})
