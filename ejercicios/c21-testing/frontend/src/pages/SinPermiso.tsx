import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Alert } from 'react-bootstrap'

function SinPermiso() {
  useEffect(() => {
    document.title = 'Sin permiso — La Librería'
  }, [])

  return (
    <div className="container py-5">
      <Alert variant="warning">No tenés permiso para acceder a esta página.</Alert>
      <Link to="/catalogo">Volver al catálogo</Link>
    </div>
  )
}

export default SinPermiso
