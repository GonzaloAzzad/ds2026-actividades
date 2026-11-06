import { Navigate, Outlet } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import type { Rol } from '../types/auth'

interface PrivateRouteProps {
  rol?: Rol
}

function PrivateRoute({ rol }: PrivateRouteProps) {
  const { usuario, cargando } = useAuth()

  // 1. ¿ya sé quién sos?
  if (cargando) {
    return (
      <div className="container py-5 text-center">
        <Spinner animation="border" role="status" />
      </div>
    )
  }

  // 2. ¿sos alguien? (equivalente UI del 401)
  if (!usuario) {
    return <Navigate to="/login" replace />
  }

  // 3. ¿podés? (equivalente UI del 403)
  if (rol && usuario.rol !== rol) {
    return <Navigate to="/sin-permiso" replace />
  }

  return <Outlet />
}

export default PrivateRoute
