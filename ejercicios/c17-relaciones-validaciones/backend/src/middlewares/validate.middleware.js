export const validate = (schema) => (req, res, next) => {
  const resultado = schema.safeParse(req.body)
  if (!resultado.success) return next(resultado.error)
  req.body = resultado.data
  next()
}

export const validateParams = (schema) => (req, res, next) => {
  const resultado = schema.safeParse(req.params)
  if (!resultado.success) return next(resultado.error)
  req.params = resultado.data
  next()
}