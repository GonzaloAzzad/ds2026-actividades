import { describe, it, expect } from 'vitest'
import { libroCreateSchema } from './libro.validation.js'

const libroValido = {
  titulo: 'Rayuela',
  genero: 'Novela',
  descripcion: 'Un clásico de Cortázar',
  imagen: 'https://img/r.jpg',
  autorId: 1,
}

describe('libroCreateSchema', () => {
  it('rechaza un título que son solo espacios', () => {
    const resultado = libroCreateSchema.safeParse({ ...libroValido, titulo: '   ' })
    expect(resultado.success).toBe(false)
    expect(resultado.error.issues[0].path).toEqual(['titulo'])
  })

  it('rechaza un autorId que no es positivo', () => {
    const resultado = libroCreateSchema.safeParse({ ...libroValido, autorId: 0 })
    expect(resultado.success).toBe(false)
    expect(resultado.error.issues[0].path).toEqual(['autorId'])
  })
})
