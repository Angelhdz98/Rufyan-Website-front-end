import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Alias para rutas absolutas
    },
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true, // Permite la mezcla de ESModules y CommonJS
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020', // Transpila el código a ES2020
    },
  },
});