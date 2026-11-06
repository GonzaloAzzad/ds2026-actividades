import * as autorService from '../services/autor.service.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const getAll = asyncHandler(async (req, res) => {
  const { nacionalidad } = req.query
  res.json(await autorService.findAll(nacionalidad))
})

export const getById = asyncHandler(async (req, res) => {
  const autor = await autorService.findById(req.params.id)
  if (!autor) return res.status(404).json({ error: 'Autor no encontrado' })
  res.json(autor)
})

export const create = asyncHandler(async (req, res) => {
  const nuevo = await autorService.create(req.body)
  res.status(201).json(nuevo)
})

export const update = asyncHandler(async (req, res) => {
  const actualizado = await autorService.update(req.params.id, req.body)
  res.json(actualizado)
})

export const remove = asyncHandler(async (req, res) => {
  await autorService.remove(req.params.id)
  res.status(204).send()
})