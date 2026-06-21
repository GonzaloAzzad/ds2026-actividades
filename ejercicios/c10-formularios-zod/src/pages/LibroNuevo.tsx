import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { libroSchema, type LibroValidado } from '../schemas/libroSchema'
import type { Libro } from '../types/libro'

const IMG_PLACEHOLDER = 'https://placehold.co/300x400?text=Libro'

interface Props {
  onAgregar: (libro: Libro) => void
}

function LibroNuevo({ onAgregar }: Props) {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LibroValidado>({ resolver: zodResolver(libroSchema) })

  const onSubmit = (data: LibroValidado) => {
    onAgregar({
      ...data,
      id: Date.now(),
      imagen: IMG_PLACEHOLDER,
    })
    navigate('/catalogo')
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="container py-4" style={{ maxWidth: 480 }}>
      <h2>Nuevo libro</h2>

      <Form.Group className="mb-3">
        <Form.Label>Título</Form.Label>
        <Form.Control {...register('titulo')} isInvalid={!!errors.titulo} />
        <Form.Control.Feedback type="invalid">{errors.titulo?.message}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Autor</Form.Label>
        <Form.Control {...register('autor')} isInvalid={!!errors.autor} />
        <Form.Control.Feedback type="invalid">{errors.autor?.message}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Género</Form.Label>
        <Form.Control {...register('genero')} isInvalid={!!errors.genero} />
        <Form.Control.Feedback type="invalid">{errors.genero?.message}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Descripción</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          {...register('descripcion')}
          isInvalid={!!errors.descripcion}
        />
        <Form.Control.Feedback type="invalid">{errors.descripcion?.message}</Form.Control.Feedback>
      </Form.Group>

      <Button type="submit">Agregar libro</Button>
    </Form>
  )
}

export default LibroNuevo