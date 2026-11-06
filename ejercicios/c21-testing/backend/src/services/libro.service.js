import { prisma } from '../config/prisma.js'

export async function findAll(genero) {
  return prisma.libro.findMany({
    where: genero ? { genero: { equals: genero, mode: 'insensitive' } } : undefined,
    include: { autor: true },
  })
}

export async function findById(id) {
  return prisma.libro.findUnique({
    where: { id },
    include: { autor: true, categorias: true },
  })
}

export async function create(datos) {
  const { categoriaIds, ...resto } = datos
  return prisma.libro.create({
    data: {
      ...resto,
      ...(categoriaIds?.length ? { categorias: { connect: categoriaIds.map((id) => ({ id })) } } : {}),
    },
    include: { autor: true, categorias: true },
  })
}

export async function update(id, datos) {
  const { categoriaIds, ...resto } = datos
  return prisma.libro.update({
    where: { id },
    data: {
      ...resto,
      ...(categoriaIds ? { categorias: { set: categoriaIds.map((id) => ({ id })) } } : {}),
    },
    include: { autor: true, categorias: true },
  })
}

export async function remove(id) {
  await prisma.libro.delete({ where: { id } })
}