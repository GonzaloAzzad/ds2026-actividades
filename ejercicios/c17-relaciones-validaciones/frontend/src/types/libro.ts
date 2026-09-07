export default interface LibroCardProps {
  titulo: string
  autor: string
  genero: string
  descripcion: string
  imagen: string
}

export interface Libro extends LibroCardProps {
  id: number
}