import devServer from '@hono/vite-dev-server'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    devServer({
      entry: 'src/index.tsx'
    })
  ],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        projects: 'projects.html'
      }
    }
  }
})
