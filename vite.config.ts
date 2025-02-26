import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  // for ngrok:
  // server: {
  //   allowedHosts: true
  // }
})