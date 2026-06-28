import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Libro } from '../types/libro'

function LibroCard({ id, titulo, autor, genero, descripcion, imagen }: Libro) {
  const [likes, setLikes] = useState<number>(0)

  return (
    <div className="col">
      <div className="card h-100">
        <img src={imagen} className="card-img-top" alt={titulo} />
        <div className="card-body">
          <h5 className="card-title">{titulo}</h5>
          <p className="card-text">{descripcion}</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">{autor}</li>
          <li className="list-group-item">{genero}</li>
        </ul>
        <div className="card-body d-flex justify-content-between">
          <Link to={`/libros/${id}`} className="card-link">Ver más</Link>
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => setLikes(likes + 1)}
          >
            ❤ {likes}
          </button>
        </div>
      </div>
    </div>
  )
}

export default LibroCard