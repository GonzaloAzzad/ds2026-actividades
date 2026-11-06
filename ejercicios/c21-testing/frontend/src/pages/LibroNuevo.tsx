import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Alert } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { libroSchema, type LibroValidado } from '../schemas/libroSchema'
import { apiFetch } from '../services/api'
import { useFetch } from '../hooks/useFetch'
import type { Autor } from '../types/libro'

function LibroNuevo() {
  const navigate = useNavigate()
  const [errorServidor, setErrorServidor] = useState<string | null>(null)
  const { data: autores } = useFetch<Autor[]>('/autores')
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LibroValidado>({ resolver: zodResolver(libroSchema) })

  useEffect(() => {
    document.title = 'Nuevo libro — La Librería'
    return () => {
      document.title = 'La Librería'
    }
  }, [])

  const onSubmit = async (datos: LibroValidado) => {
    setErrorServidor(null)
    try {
      await apiFetch('/libros', {
        method: 'POST',
        body: JSON.stringify({ ...datos, autorId: Number(datos.autorId) }),
      })
      navigate('/catalogo')
    } catch (e) {
      setErrorServidor(e instanceof Error ? e.message : 'Error desconocido')
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="container py-4" style={{ maxWidth: 480 }}>
      <h2>Nuevo libro</h2>

      {errorServidor && <Alert variant="danger">{errorServidor}</Alert>}

      <Form.Group className="mb-3">
        <Form.Label>Título</Form.Label>
        <Form.Control {...register('titulo')} isInvalid={!!errors.titulo} />
        <Form.Control.Feedback type="invalid">{errors.titulo?.message}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Autor</Form.Label>
        <Form.Select {...register('autorId')} isInvalid={!!errors.autorId}>
          <option value="">Elegí un autor</option>
          {(autores ?? []).map((a) => (
            <option key={a.id} value={a.id}>{a.nombre}</option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">{errors.autorId?.message}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Género</Form.Label>
        <Form.Control {...register('genero')} isInvalid={!!errors.genero} />
        <Form.Control.Feedback type="invalid">{errors.genero?.message}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Imagen (URL)</Form.Label>
        <Form.Control {...register('imagen')} isInvalid={!!errors.imagen} />
        <Form.Control.Feedback type="invalid">{errors.imagen?.message}</Form.Control.Feedback>
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

      <Button type="submit" disabled={isSubmitting}>Agregar libro</Button>
    </Form>
  )
}

export default LibroNuevo
