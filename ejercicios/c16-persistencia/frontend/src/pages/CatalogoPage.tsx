import { useEffect } from 'react'
import { Spinner, Alert } from 'react-bootstrap'
import LibroCard from '../components/LibroCard'
import { useFetch } from '../hooks/useFetch'
import type { Libro } from '../types/libro'

function CatalogoPage() {
  const { data: libros, loading, error } = useFetch<Libro[]>('/libros.json')

  // useEffect: actualiza el título de la pestaña según el estado
  useEffect(() => {
    if (loading) {
      document.title = 'Cargando catálogo...'
    } else if (error) {
      document.title = 'Error — La Librería'
    } else {
      document.title = `Catálogo (${libros?.length ?? 0} libros) — La Librería`
    }
  }, [loading, error, libros])

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <Spinner animation="border" role="status" />
        <p className="mt-3">Cargando libros...</p>
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

  return (
    <div className="container py-5">
      <h2 className="mb-4">Catálogo de libros</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {(libros ?? []).map((libro) => (
          <LibroCard key={libro.id} {...libro} />
        ))}
      </div>
    </div>
  )
}

export default CatalogoPage