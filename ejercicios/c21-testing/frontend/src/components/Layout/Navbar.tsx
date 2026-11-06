import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function Navbar() {
  const navigate = useNavigate()
  const { usuario, logout, tieneRol } = useAuth()

  const manejarSesion = () => {
    if (usuario) {
      logout()
      navigate('/')
    } else {
      navigate('/login')
    }
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">📚 La Librería</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/catalogo">Catálogo</Link>
            </li>
            {tieneRol('ADMIN') && (
              <li className="nav-item">
                <Link className="nav-link" to="/libros/nuevo">Nuevo libro</Link>
              </li>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/contacto">Contacto</Link>
            </li>
          </ul>
          <div className="d-flex align-items-center">
            {usuario && <span className="me-3">Hola, {usuario.nombre}</span>}
            <button className="btn btn-outline-primary btn-sm" onClick={manejarSesion}>
              {usuario ? 'Salir' : 'Ingresar'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
