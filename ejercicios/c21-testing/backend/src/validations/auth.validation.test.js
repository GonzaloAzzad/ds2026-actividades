import { describe, it, expect } from 'vitest'
import { loginSchema, registroSchema } from './auth.validation.js'

describe('loginSchema', () => {
  it('normaliza el email: saca espacios y pasa a minúsculas', () => {
    const resultado = loginSchema.safeParse({ email: '  Admin@Libreria.TEST ', password: 'x' })
    expect(resultado.success).toBe(true)
    expect(resultado.data.email).toBe('admin@libreria.test')
  })
})

describe('registroSchema', () => {
  it('una contraseña débil acumula los tres errores', () => {
    const resultado = registroSchema.safeParse({ nombre: 'Ana', email: 'ana@libreria.test', password: 'corta' })
    expect(resultado.success).toBe(false)
    expect(resultado.error.issues.map((i) => i.message)).toHaveLength(3)
  })
})
