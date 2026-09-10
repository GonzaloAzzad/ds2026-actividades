import * as libroService from '../services/libro.service.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const getAll = asyncHandler(async (req, res) => {
  const { genero } = req.query
  res.json(await libroService.findAll(genero))
})

export const getById = asyncHandler(async (req, res) => {
  const libro = await libroService.findById(req.params.id)
  if (!libro) return res.status(404).json({ error: 'Libro no encontrado' })
  res.json(libro)
})

export const create = asyncHandler(async (req, res) => {
  const nuevo = await libroService.create(req.body)
  res.status(201).json(nuevo)
})

export const update = asyncHandler(async (req, res) => {
  const actualizado = await libroService.update(req.params.id, req.body)
  res.json(actualizado)
})

export const remove = asyncHandler(async (req, res) => {
  await libroService.remove(req.params.id)
  res.status(204).send()
})