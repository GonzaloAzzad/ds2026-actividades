/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', // los componentes necesitan un DOM: jsdom lo simula
    setupFiles: './src/setupTests.ts', // corre antes de cada archivo de test
  },
})
