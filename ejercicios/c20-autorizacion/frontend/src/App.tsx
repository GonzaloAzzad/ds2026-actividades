import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Layout from './components/Layout/Layout'
import Home from './pages/Home'
import CatalogoPage from './pages/CatalogoPage'
import LibroDetalle from './pages/LibroDetalle'
import LibroNuevo from './pages/LibroNuevo'
import Login from './pages/Login'
import SinPermiso from './pages/SinPermiso'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<CatalogoPage />} />
          <Route path="/libros/:id" element={<LibroDetalle />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sin-permiso" element={<SinPermiso />} />

          {/* sin path: layout route que protege todo lo que va adentro */}
          <Route element={<PrivateRoute rol="ADMIN" />}>
            <Route path="/libros/nuevo" element={<LibroNuevo />} />
          </Route>
        </Routes>
      </Layout>
    </AuthProvider>
  )
}

export default App
