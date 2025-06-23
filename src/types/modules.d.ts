declare module 'canvas-confetti';
declare module 'react-dom';
declare module 'react-dom/client';
declare module '@vitejs/plugin-react' {
  import { Plugin } from 'vite';
  export default function reactSWC(options?: any): Plugin;
}