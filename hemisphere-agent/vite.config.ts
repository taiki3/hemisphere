import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 1420,
    strictPort: true,
  },
  build: {
    outDir: 'dist',
    minify: 'esbuild',
    target: 'esnext',
  },
})