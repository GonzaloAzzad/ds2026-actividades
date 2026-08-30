import { useParams, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { Spinner, Alert } from 'react-bootstrap'
import { useFetch } from '../hooks/useFetch'
import type { Libro } from '../types/libro'

function LibroDetalle() {
  const { id } = useParams<{ id: string }>()
  const { data: libros, loading, error } = useFetch<Libro[]>('/libros.json')

  const libro = libros?.find((l) => l.id === Number(id))

  // useEffect: actualiza el título de la pestaña con el nombre del libro
  useEffect(() => {
    if (libro) {
      document.title = `${libro.titulo} — La Librería`
    } else {
      document.title = 'Detalle — La Librería'
    }
  }, [libro])

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <Spinner animation="border" role="status" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-5">
        <Alert variant="danger">{error}</Alert>
      </div>
    )
  }

  if (!libro) {
    return (
      <div className="container py-5">
        <h2>Libro no encontrado</h2>
        <Link to="/catalogo">Volver al catálogo</Link>
      </div>
    )
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-4">
          <img src={libro.imagen} alt={libro.titulo} className="img-fluid rounded" />
        </div>
        <div className="col-md-8">
          <h2>{libro.titulo}</h2>
          <h5 className="text-muted">{libro.autor}</h5>
          <p><strong>Género:</strong> {libro.genero}</p>
          <p>{libro.descripcion}</p>
          <Link to="/catalogo">Volver al catálogo</Link>
        </div>
      </div>
    </div>
  )
}

export default LibroDetalle