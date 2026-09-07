import { z } from 'zod'

export const libroCreateSchema = z.object({
  titulo: z.string().trim().min(1, 'El título es obligatorio').max(200),
  genero: z.string().trim().min(1, 'El género es obligatorio'),
  descripcion: z.string().trim().min(1, 'La descripción es obligatoria'),
  imagen: z.string().trim().min(1, 'La imagen es obligatoria'),
  autorId: z.number().int().positive('El autor es obligatorio'),
  categoriaIds: z.array(z.number().int().positive()).optional(),
})

export const libroUpdateSchema = libroCreateSchema.partial()