import LibroCard from '../components/LibroCard'
import type { Libro } from '../types/libro'

interface Props {
  libros: Libro[]
}

function CatalogoPage({ libros }: Props) {
  return (
    <div className="container py-5">
      <h2 className="mb-4">Catálogo de libros</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {libros.map((libro) => (
          <LibroCard key={libro.id} {...libro} />
        ))}
      </div>
    </div>
  )
}

export default CatalogoPage