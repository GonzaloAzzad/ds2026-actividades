import * as libroService from '../services/libro.service.js'

export async function getAll(req, res) {
  try {
    const { genero } = req.query
    res.json(await libroService.findAll(genero))
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export async function getById(req, res) {
  try {
    const libro = await libroService.findById(Number(req.params.id))
    if (!libro) return res.status(404).json({ error: 'Libro no encontrado' })
    res.json(libro)
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export async function create(req, res) {
  try {
    const nuevo = await libroService.create(req.body)
    res.status(201).json(nuevo)
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export async function update(req, res) {
  try {
    const actualizado = await libroService.update(Number(req.params.id), req.body)
    if (!actualizado) return res.status(404).json({ error: 'Libro no encontrado' })
    res.json(actualizado)
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export async function remove(req, res) {
  try {
    const ok = await libroService.remove(Number(req.params.id))
    if (!ok) return res.status(404).json({ error: 'Libro no encontrado' })
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}