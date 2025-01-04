import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "http://myblogmagicbucket.s3-website.ap-south-1.amazonaws.com", 
  build: {
    outDir: "dist", 
  },
})
