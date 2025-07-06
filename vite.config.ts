import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({mode}) => {
  return {
    plugins: [
      react(),
      tailwindcss()
    ],
    build: {
      outDir: 'dist',
      sourcemap: mode !== 'production',
    },
    envPrefix: 'VITE_',
    define: {
      'process.env.NODE_ENV': JSON.stringify(mode),
    }
  }
})