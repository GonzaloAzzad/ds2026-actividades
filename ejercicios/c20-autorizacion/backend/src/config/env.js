function obligatorio(nombre) {
  const valor = process.env[nombre]
  if (!valor) throw new Error(`Falta ${nombre} en el .env`)
  return valor
}

export const JWT_SECRET = obligatorio('JWT_SECRET')
export const JWT_EXPIRES_IN = '2h'
export const SALT_ROUNDS = 10