import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Navbar from './Navbar'
import { useAuth } from '../../context/AuthContext'
import type { Usuario } from '../../types/auth'

vi.mock('../../context/AuthContext', () => ({
  useAuth: vi.fn(),
}))

function sesionCon(usuario: Usuario | null) {
  vi.mocked(useAuth).mockReturnValue({
    usuario,
    cargando: false,
    estaAutenticado: usuario !== null,
    tieneRol: (rol) => usuario?.rol === rol,
    login: vi.fn(),
    logout: vi.fn(),
  })
}

function renderNavbar() {
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  )
}

describe('Navbar según el rol', () => {
  it('sin sesión: muestra Ingresar y NO muestra Nuevo libro', () => {
    sesionCon(null)
    renderNavbar()

    expect(screen.getByRole('button', { name: 'Ingresar' })).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Nuevo libro' })).not.toBeInTheDocument()
  })

  it('CLIENTE: saluda por nombre y NO ve Nuevo libro', () => {
    sesionCon({ id: 2, email: 'cliente@libreria.test', nombre: 'Cliente', rol: 'CLIENTE' })
    renderNavbar()

    expect(screen.getByText('Hola, Cliente')).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Nuevo libro' })).not.toBeInTheDocument()
  })
})
