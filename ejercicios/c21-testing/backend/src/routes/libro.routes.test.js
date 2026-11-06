import { describe, it, expect } from 'vitest'
import request from 'supertest'
import jwt from 'jsonwebtoken'
import app from '../app.js'
import { JWT_SECRET } from '../config/env.js'

const tokenCliente = jwt.sign({ id: 2, rol: 'CLIENTE' }, JWT_SECRET, { expiresIn: '1h' })
const tokenAdmin = jwt.sign({ id: 1, rol: 'ADMIN' }, JWT_SECRET, { expiresIn: '1h' })
const tokenAdulterado = jwt.sign({ id: 1, rol: 'ADMIN' }, 'otro-secret', { expiresIn: '1h' })

describe('matriz de permisos (sin base de datos)', () => {
  it('POST /api/libros sin token → 401 "Falta el token"', async () => {
    const res = await request(app).post('/api/libros').send({})
    expect(res.status).toBe(401)
    expect(res.body.error).toBe('Falta el token')
  })

  it('POST /api/libros con token de CLIENTE → 403', async () => {
    const res = await request(app)
      .post('/api/libros')
      .set('Authorization', `Bearer ${tokenCliente}`)
      .send({})
    expect(res.status).toBe(403)
  })

  it('POST /api/libros con token adulterado → 401 "Token inválido"', async () => {
    const res = await request(app)
      .post('/api/libros')
      .set('Authorization', `Bearer ${tokenAdulterado}`)
      .send({})
    expect(res.status).toBe(401)
    expect(res.body.error).toBe('Token inválido')
  })

  it('POST /api/libros como ADMIN con datos inválidos → 400 (no llega a la base)', async () => {
    const res = await request(app)
      .post('/api/libros')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send({})
    expect(res.status).toBe(400)
    expect(res.body.error).toBe('Datos inválidos')
  })

  it('DELETE /api/libros/1 con CLIENTE → 403', async () => {
    const res = await request(app)
      .delete('/api/libros/1')
      .set('Authorization', `Bearer ${tokenCliente}`)
    expect(res.status).toBe(403)
  })

  it('GET /api/no-existe → 404 "Ruta no encontrada"', async () => {
    const res = await request(app).get('/api/no-existe')
    expect(res.status).toBe(404)
    expect(res.body.error).toBe('Ruta no encontrada')
  })
})
