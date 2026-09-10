import * as authService from '../services/auth.service.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const registrar = asyncHandler(async (req, res) => {
  const usuario = await authService.registrar(req.body)
  res.status(201).json(usuario)
})

export const login = asyncHandler(async (req, res) => {
  const resultado = await authService.login(req.body)
  if (!resultado) return res.status(401).json({ error: 'Credenciales inválidas' })
  res.json(resultado)
})

export const yo = asyncHandler(async (req, res) => {
  const usuario = await authService.findById(req.usuario.id)
  if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' })
  res.json(usuario)
})