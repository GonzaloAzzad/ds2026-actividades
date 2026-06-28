import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './pages/Home'
import CatalogoPage from './pages/CatalogoPage'
import LibroDetalle from './pages/LibroDetalle'
import LibroNuevo from './pages/LibroNuevo'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<CatalogoPage />} />
        <Route path="/libros/:id" element={<LibroDetalle />} />
        <Route path="/libros/nuevo" element={<LibroNuevo />} />
      </Routes>
    </Layout>
  )
}

export default App