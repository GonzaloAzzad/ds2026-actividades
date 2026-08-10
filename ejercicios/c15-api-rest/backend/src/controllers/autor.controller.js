import * as autorService from '../services/autor.service.js'

export function getAll(req, res) {
  const { nacionalidad } = req.query
  res.json(autorService.findAll(nacionalidad))
}

export function getById(req, res) {
  const autor = autorService.findById(Number(req.params.id))
  if (!autor) return res.status(404).json({ error: 'Autor no encontrado' })
  res.json(autor)
}

export function create(req, res) {
  const nuevo = autorService.create(req.body)
  res.status(201).json(nuevo)
}

export function update(req, res) {
  const actualizado = autorService.update(Number(req.params.id), req.body)
  if (!actualizado) return res.status(404).json({ error: 'Autor no encontrado' })
  res.json(actualizado)
}

export function remove(req, res) {
  const ok = autorService.remove(Number(req.params.id))
  if (!ok) return res.status(404).json({ error: 'Autor no encontrado' })
  res.status(204).send()
}