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
  // for ngrok:
  // server: {
  //   allowedHosts: true
  // }
})