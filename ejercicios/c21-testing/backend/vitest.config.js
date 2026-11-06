import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    env: {
      JWT_SECRET: 'secreto-solo-para-tests',
      DATABASE_URL: process.env.DATABASE_URL ?? 'postgresql://postgres:postgres@localhost:5432/libreria_db',
    },
  },
})
