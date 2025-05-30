import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import Checker from 'vite-plugin-checker'

export default defineConfig({
  plugins: [
    tailwindcss(),
    Checker({
      typescript: true
    })
  ],
  // for docker development:
  server: {
    watch: {
      usePolling: true,
      interval: 100
    }
  }
  // for ngrok:
  // server: {
  //   allowedHosts: true
  // }
  // for local development:
  /*
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
  */
})
