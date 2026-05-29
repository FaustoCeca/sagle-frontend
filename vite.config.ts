import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// React Compiler (babel-plugin-react-compiler) is enabled here, so manual
// memoization (useMemo / useCallback / memo) is unnecessary throughout the
// app — the compiler inserts optimal, fine-grained memoization automatically.
const reactCompilerConfig = { target: '19' } as const

export default defineConfig(({ mode }) => {
  return {
    plugins: [
      react({
        babel: {
          plugins: [['babel-plugin-react-compiler', reactCompilerConfig]],
        },
      }),
      tailwindcss(),
    ],
    build: {
      outDir: 'dist',
      sourcemap: true,
    },
    envPrefix: 'VITE_',
    define: {
      'process.env.NODE_ENV': JSON.stringify(mode),
    },
  }
})
