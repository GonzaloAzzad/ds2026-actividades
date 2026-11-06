export interface Autor {
  id: number
  nombre: string
  nacionalidad: string
  biografia: string
}

export interface Categoria {
  id: number
  nombre: string
}

export default interface LibroCardProps {
  titulo: string
  autor: Autor
  genero: string
  descripcion: string
  imagen: string
}

export interface Libro extends LibroCardProps {
  id: number
  autorId: number
  categorias?: Categoria[]
}
