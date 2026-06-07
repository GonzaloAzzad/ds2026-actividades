import { useParams } from 'react-router-dom'

function LibroDetalle() {
  const { id } = useParams<{ id: string }>()
  return <h2>Detalle del libro {id}</h2>
}

export default LibroDetalle