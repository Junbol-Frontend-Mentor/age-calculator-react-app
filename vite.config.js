// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/age-calculator-react-app/', // Set this to your repository name
  plugins: [react()],
});

