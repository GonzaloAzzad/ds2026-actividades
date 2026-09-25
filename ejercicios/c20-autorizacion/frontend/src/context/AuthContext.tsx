import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { apiFetch } from '../services/api'
import { guardarToken, obtenerToken, borrarToken } from '../services/sesion'
import type { Usuario, Sesion, Credenciales, Rol } from '../types/auth'

interface AuthContextType {
  usuario: Usuario | null
  cargando: boolean
  estaAutenticado: boolean
  tieneRol: (rol: Rol) => boolean
  login: (credenciales: Credenciales) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const [cargando, setCargando] = useState(obtenerToken() !== null)

  const logout = () => {
    borrarToken()
    setUsuario(null)
  }

  const login = async (credenciales: Credenciales) => {
    const sesion = await apiFetch<Sesion>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credenciales),
    })
    guardarToken(sesion.token)
    setUsuario(sesion.usuario)
  }

  // F5 borra el estado de React, pero el token sigue en localStorage.
  // Se le pregunta al back quién sos (no se decodifica el token en el front).
  useEffect(() => {
    if (!obtenerToken()) return
    apiFetch<Usuario>('/auth/yo')
      .then(setUsuario)
      .catch(() => borrarToken())
      .finally(() => setCargando(false))
  }, [])

  // apiFetch avisa con este evento cuando un 401 llega con token: la sesión venció.
  useEffect(() => {
    window.addEventListener('sesion-expirada', logout)
    return () => window.removeEventListener('sesion-expirada', logout)
  }, [])

  const tieneRol = (rol: Rol) => usuario?.rol === rol

  const value: AuthContextType = {
    usuario,
    cargando,
    estaAutenticado: usuario !== null,
    tieneRol,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  }
  return context
}
