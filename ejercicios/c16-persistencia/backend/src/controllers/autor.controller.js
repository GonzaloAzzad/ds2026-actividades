import * as autorService from '../services/autor.service.js'

export async function getAll(req, res) {
  try {
    const { nacionalidad } = req.query
    res.json(await autorService.findAll(nacionalidad))
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export async function getById(req, res) {
  try {
    const autor = await autorService.findById(Number(req.params.id))
    if (!autor) return res.status(404).json({ error: 'Autor no encontrado' })
    res.json(autor)
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export async function create(req, res) {
  try {
    const nuevo = await autorService.create(req.body)
    res.status(201).json(nuevo)
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export async function update(req, res) {
  try {
    const actualizado = await autorService.update(Number(req.params.id), req.body)
    if (!actualizado) return res.status(404).json({ error: 'Autor no encontrado' })
    res.json(actualizado)
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export async function remove(req, res) {
  try {
    const ok = await autorService.remove(Number(req.params.id))
    if (!ok) return res.status(404).json({ error: 'Autor no encontrado' })
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}