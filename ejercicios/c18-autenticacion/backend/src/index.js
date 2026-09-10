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

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'API de La Librería funcionando 🐳' })
})

app.use('/api/auth', authRoutes)
app.use('/api/libros', libroRoutes)
app.use('/api/autores', autorRoutes)

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
})