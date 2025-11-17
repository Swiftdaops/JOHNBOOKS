import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      // Proxy Open Library API requests to avoid CORS in development
      "/openlibrary": {
        target: "https://openlibrary.org",
        changeOrigin: true,
        secure: true,
        rewrite: (p) => p.replace(/^\/openlibrary/, ""),
      },
    },
  },
})
