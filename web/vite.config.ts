import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path, { resolve } from 'path'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
   // Load environment variables based on mode
   // This will load variables from .env, .env.local, .env.[mode], .env.[mode].local
   const env = loadEnv(mode, process.cwd(), '')
   const isProduction = mode === 'production'

   return {
      plugins: [
         react({
            jsxImportSource: '@emotion/react',
         }),
         // Bundle analyzer for production builds
         isProduction &&
            visualizer({
               filename: 'dist/stats.html',
               open: false,
               gzipSize: true,
               brotliSize: true,
            }),
      ].filter(Boolean),
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
         sourcemap: !isProduction, // Source maps only in development
         minify: isProduction ? 'terser' : false,
         target: 'es2020',
         rollupOptions: {
            output: {
               // Manual chunk splitting for better caching
               manualChunks: {
                  // Vendor chunks
                  'react-vendor': ['react', 'react-dom'],
                  'router-vendor': ['react-router-dom'],
                  'redux-vendor': ['@reduxjs/toolkit', 'react-redux'],
                  'ui-vendor': ['@chakra-ui/react', '@emotion/react', '@emotion/styled'],
                  'chart-vendor': ['recharts', 'd3-scale', 'd3-shape'],
                  'utils-vendor': ['lodash', 'moment', 'date-fns', 'axios'],
                  'icons-vendor': ['react-icons', 'lucide-react'],
               },
               // Optimize chunk file names
               chunkFileNames: (chunkInfo) => {
                  const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/').pop() : 'chunk'
                  return `js/${facadeModuleId}-[hash].js`
               },
               assetFileNames: (assetInfo) => {
                  const info = assetInfo.name.split('.')
                  const ext = info[info.length - 1]
                  if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
                     return `images/[name]-[hash][extname]`
                  }
                  if (/css/i.test(ext)) {
                     return `css/[name]-[hash][extname]`
                  }
                  return `assets/[name]-[hash][extname]`
               },
            },
         },
         // Optimize for production
         ...(isProduction && {
            terserOptions: {
               compress: {
                  drop_console: true,
                  drop_debugger: true,
               },
            },
         }),
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
