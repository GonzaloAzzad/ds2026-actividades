import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Alert } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginValidado } from '../schemas/loginSchema'
import { useAuth } from '../context/AuthContext'

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [errorServidor, setErrorServidor] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValidado>({ resolver: zodResolver(loginSchema) })

  useEffect(() => {
    document.title = 'Iniciar sesión — La Librería'
  }, [])

  const onSubmit = async (datos: LoginValidado) => {
    setErrorServidor(null)
    try {
      await login(datos)
      navigate('/catalogo')
    } catch (e) {
      setErrorServidor(e instanceof Error ? e.message : 'Error desconocido')
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="container py-4" style={{ maxWidth: 420 }}>
      <h2>Iniciar sesión</h2>

      {errorServidor && <Alert variant="danger">{errorServidor}</Alert>}

      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control {...register('email')} isInvalid={!!errors.email} />
        <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control type="password" {...register('password')} isInvalid={!!errors.password} />
        <Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>
      </Form.Group>

      <Button type="submit" disabled={isSubmitting}>Ingresar</Button>
    </Form>
  )
}

export default Login
