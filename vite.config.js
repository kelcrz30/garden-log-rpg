import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'Garden Log',
        short_name: 'GardenLog',
        description: 'Grow your forest with every step',
        theme_color: '#10b981',
        background_color: '#f0f9ff',
        display: 'standalone',
        icons: [
          {
            src: 'https://api.dicebear.com/7.x/pixel-art/png?seed=Tree&size=192',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'https://api.dicebear.com/7.x/pixel-art/png?seed=Tree&size=512',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})