import { useParams, Link } from 'react-router-dom'
import type { Libro } from '../types/libro'

interface Props {
  libros: Libro[]
}

function LibroDetalle({ libros }: Props) {
  const { id } = useParams<{ id: string }>()
  const libro = libros.find((l) => l.id === Number(id))

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