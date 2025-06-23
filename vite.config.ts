import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// const ReactCompilerConfig = {
//   target: '19'
// }

// https://vite.dev/config/
export default defineConfig(({mode}) => {
  // const envPrefix = mode === 'production' ? '.env.prod' :
  //   mode === 'staging' ? '.env.stgn' : '.env';

  // const envPath = `./${envPrefix}`;
  return {
    plugins: [
      react(),
      tailwindcss()
    ],
    build: {
      outDir: 'dist',
      sourcemap: mode !== 'production',
    },
    envDir: '/',
    envPrefix: 'VITE_',
    define: {
      'process.env.NODE_ENV': JSON.stringify(mode),
    }
  }
})
