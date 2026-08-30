import { prisma } from '../config/prisma.js'

export async function findAll(genero) {
  return prisma.libro.findMany({
    where: genero ? { genero: { equals: genero, mode: 'insensitive' } } : undefined,
  })
}

export async function findById(id) {
  return prisma.libro.findUnique({ where: { id } })
}

export async function create(datos) {
  return prisma.libro.create({ data: datos })
}

export async function update(id, datos) {
  const existe = await prisma.libro.findUnique({ where: { id } })
  if (!existe) return undefined
  return prisma.libro.update({ where: { id }, data: datos })
}

export async function remove(id) {
  const existe = await prisma.libro.findUnique({ where: { id } })
  if (!existe) return false
  await prisma.libro.delete({ where: { id } })
  return true
}