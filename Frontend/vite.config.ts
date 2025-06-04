import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path, { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
   // Load environment variables based on mode
   // This will load variables from .env, .env.local, .env.[mode], .env.[mode].local
   const env = loadEnv(mode, process.cwd(), '')
   // console.log(`Running in ${mode} mode with env:`, env)

   return {
      plugins: [
         react({
            jsxImportSource: '@emotion/react',
         }),
      ],
      css: {
         postcss: './postcss.config.js',
      },
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
            lib: resolve(__dirname, 'src/lib'),
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
         port: parseInt(env.PORT) || 3000, // Cổng từ env hoặc mặc định 3000
         open: false, // Mở trình duyệt khi chạy dev server
      },
      define: {
         // Cung cấp các biến môi trường cho client
         'process.env': JSON.stringify(env),
      },
   }
})
