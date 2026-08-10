import * as libroService from '../services/libro.service.js'

export function getAll(req, res) {
  const { genero } = req.query
  res.json(libroService.findAll(genero))
}

export function getById(req, res) {
  const libro = libroService.findById(Number(req.params.id))
  if (!libro) return res.status(404).json({ error: 'Libro no encontrado' })
  res.json(libro)
}

export function create(req, res) {
  const nuevo = libroService.create(req.body)
  res.status(201).json(nuevo)
}

export function update(req, res) {
  const actualizado = libroService.update(Number(req.params.id), req.body)
  if (!actualizado) return res.status(404).json({ error: 'Libro no encontrado' })
  res.json(actualizado)
}

export function remove(req, res) {
  const ok = libroService.remove(Number(req.params.id))
  if (!ok) return res.status(404).json({ error: 'Libro no encontrado' })
  res.status(204).send()
}