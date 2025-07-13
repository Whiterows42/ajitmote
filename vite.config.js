import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default {
  assetsInclude: ['**/*.glb'], // ✅ Add this line
  plugins: [react()],
};
