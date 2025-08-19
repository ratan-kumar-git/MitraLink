import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "MitraLink",
        short_name: "MitraLink",
        description: "A real-time chat app built with React and Express",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#1a1a1a",
        icons: [
          {
            src: "/mitrLink-192.webp",
            sizes: "192x192",
            type: "image/webp"
          },
          {
            src: "/mitrLink-512.webp",
            sizes: "512x512",
            type: "image/webp"
          }
        ]
      }
    })
  ],
})
