import { describe, it, expect, vi } from 'vitest'
import jwt from 'jsonwebtoken'
import { authenticate, authorize } from './auth.middleware.js'
import { JWT_SECRET } from '../config/env.js'

function crearMocks(req = {}) {
  const res = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis(),
  }
  const next = vi.fn()
  return { req, res, next }
}

describe('authorize', () => {
  it('responde 403 a un CLIENTE cuando la ruta pide ADMIN', () => {
    const { req, res, next } = crearMocks()
    req.usuario = { id: 2, rol: 'CLIENTE' }

    authorize('ADMIN')(req, res, next)

    expect(res.status).toHaveBeenCalledWith(403)
    expect(next).not.toHaveBeenCalled()
  })
})

describe('authenticate', () => {
  it('con token válido guarda el usuario y llama a next() una vez', () => {
    const token = jwt.sign({ id: 7, rol: 'CLIENTE' }, JWT_SECRET, { expiresIn: '1h' })
    const { req, res, next } = crearMocks({ headers: { authorization: `Bearer ${token}` } })

    authenticate(req, res, next)

    expect(next).toHaveBeenCalledTimes(1)
    expect(req.usuario).toEqual({ id: 7, rol: 'CLIENTE' })
  })

  it('con token vencido responde 401 "Token expirado"', () => {
    const hace10Segundos = Math.floor(Date.now() / 1000) - 10
    const token = jwt.sign({ id: 7, rol: 'CLIENTE', exp: hace10Segundos }, JWT_SECRET)
    const { req, res, next } = crearMocks({ headers: { authorization: `Bearer ${token}` } })

    authenticate(req, res, next)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({ error: 'Token expirado' })
    expect(next).not.toHaveBeenCalled()
  })
})
