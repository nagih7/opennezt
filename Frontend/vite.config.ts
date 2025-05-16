import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path, { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [react()],
   resolve: {
      alias: {
         // Alias cho các đường dẫn import ngắn gọn
         '~': resolve(__dirname, 'src'),
         api: resolve(__dirname, 'src/api'),
         assets: resolve(__dirname, 'src/assets'),
         components: resolve(__dirname, 'src/components'),
         config: resolve(__dirname, 'src/config'),
         contexts: resolve(__dirname, 'src/contexts'),
         hooks: resolve(__dirname, 'src/hooks'),
         routes: resolve(__dirname, 'src/routes'),
         services: resolve(__dirname, 'src/services'),
         store: resolve(__dirname, 'src/store'),
         types: resolve(__dirname, 'src/types'),
         utils: resolve(__dirname, 'src/utils'),
      },
   },
   // Cấu hình thư mục public của create-react-app
   publicDir: 'public',
   build: {
      outDir: 'build', // Để tương thích với create-react-app
   },
   server: {
      port: 3000, // Cổng mặc định của Vite
      open: true, // Mở trình duyệt khi chạy dev server
   },
})
