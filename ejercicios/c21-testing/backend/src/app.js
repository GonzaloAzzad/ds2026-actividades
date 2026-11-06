import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth.routes.js'
import libroRoutes from './routes/libro.routes.js'
import autorRoutes from './routes/autor.routes.js'
import { errorHandler } from './middlewares/error.middleware.js'

// Este archivo solo arma la app. No escucha ningún puerto
// así los tests pueden importarla sin abrir el 3000.
const app = express()

const corsOptions = {
  origin: [process.env.FRONTEND_URL ?? 'http://localhost:5173'],
}

app.use(cors(corsOptions)) // 1° antes de json() y de las rutas
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'API de La Librería funcionando 🐳' })
})

app.use('/api/auth', authRoutes)
app.use('/api/libros', libroRoutes)
app.use('/api/autores', autorRoutes)

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' })
})

app.use(errorHandler)

export default app
