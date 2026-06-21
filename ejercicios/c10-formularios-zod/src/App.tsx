import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Layout from './components/Layout/Layout'
import Home from './pages/Home'
import CatalogoPage from './pages/CatalogoPage'
import LibroDetalle from './pages/LibroDetalle'
import LibroNuevo from './pages/LibroNuevo'
import librosIniciales from './data/librosIniciales'
import type { Libro } from './types/libro'

function App() {
  const [libros, setLibros] = useState<Libro[]>(librosIniciales)

  const agregarLibro = (nuevo: Libro) => {
    setLibros([...libros, nuevo])
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<CatalogoPage libros={libros} />} />
        <Route path="/libros/:id" element={<LibroDetalle libros={libros} />} />
        <Route path="/libros/nuevo" element={<LibroNuevo onAgregar={agregarLibro} />} />
      </Routes>
    </Layout>
  )
}

export default App