import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
  },
  optimizeDeps: {
    include: [
      'framer-motion',
      'react-toastify',
      'react-helmet-async',
      'react-router-dom',
      '@emailjs/browser',
    ],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'framer-motion': ['framer-motion'],
          'icons': ['lucide-react'],
        },
      },
    },
  },
})
