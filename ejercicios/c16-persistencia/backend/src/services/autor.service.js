import { prisma } from '../config/prisma.js'

export async function findAll(nacionalidad) {
  return prisma.autor.findMany({
    where: nacionalidad ? { nacionalidad: { equals: nacionalidad, mode: 'insensitive' } } : undefined,
  })
}

export async function findById(id) {
  return prisma.autor.findUnique({ where: { id } })
}

export async function create(datos) {
  return prisma.autor.create({ data: datos })
}

export async function update(id, datos) {
  const existe = await prisma.autor.findUnique({ where: { id } })
  if (!existe) return undefined
  return prisma.autor.update({ where: { id }, data: datos })
}

export async function remove(id) {
  const existe = await prisma.autor.findUnique({ where: { id } })
  if (!existe) return false
  await prisma.autor.delete({ where: { id } })
  return true
}