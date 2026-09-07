import { z } from 'zod'

export const libroSchema = z.object({
  titulo: z.string().trim().min(1, 'El título es obligatorio'),
  autor: z.string().trim().min(1, 'El autor es obligatorio'),
  genero: z.string().trim().min(1, 'El género es obligatorio'),
  descripcion: z.string().trim().min(10, 'La descripción debe tener al menos 10 caracteres'),
})

export type LibroValidado = z.infer<typeof libroSchema>