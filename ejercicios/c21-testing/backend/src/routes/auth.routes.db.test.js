import { describe, it, expect, afterAll } from 'vitest'
import request from 'supertest'
import app from '../app.js'
import { prisma } from '../config/prisma.js'

afterAll(async () => {
  await prisma.$disconnect()
})

describe('POST /api/auth/login (contra la base de datos)', () => {
  it('credenciales del seed → 200 con token y sin passwordHash', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'cliente@libreria.test', password: 'Cliente1234' })
    expect(res.status).toBe(200)
    expect(res.body.token).toEqual(expect.any(String))
    expect(res.body.usuario).not.toHaveProperty('passwordHash')
  })

  it('mail que no existe → 401 "Credenciales inválidas"', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'nadie@libreria.test', password: 'Clave1234' })
    expect(res.status).toBe(401)
    expect(res.body.error).toBe('Credenciales inválidas')
  })
})
