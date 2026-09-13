export interface Usuario {
  id: number
  email: string
  nombre: string
  rol: 'ADMIN' | 'CLIENTE'
}

export interface Sesion {
  token: string
  usuario: Usuario
}
