import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, './src'),
      "@apis": path.resolve(__dirname, './src/apis'),
      "@assets": path.resolve(__dirname, './src/assets'),
      "@components": path.resolve(__dirname, './src/components'),
      "@contexts": path.resolve(__dirname, './src/contexts'),
      "@interfaces": path.resolve(__dirname, './src/interfaces'),
      "@pages": path.resolve(__dirname, './src/pages'),
      "@providers": path.resolve(__dirname, './src/providers'),
      "@hooks": path.resolve(__dirname, './src/hooks'),
      "@libs": path.resolve(__dirname, './src/libs'),
    }
  },
})
