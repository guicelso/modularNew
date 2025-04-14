import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { federation } from '@module-federation/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'modulo1',
      filename: 'remoteEntry.js',
      exposes: {
        './Modulo1App': './src/App',
        './Modulo1Pagina': './src/components/Pagina',
      },
      shared: {
        react: { singleton: true, requiredVersion: '^18.2.0' },
        'react-dom': { singleton: true, requiredVersion: '^18.2.0' },
        'react-router-dom': { singleton: true },
        '@mui/material': { singleton: true },
        '@emotion/react': { singleton: true },
        '@emotion/styled': { singleton: true },
      }
    }),
  ],
  server: {
    port: 5001,
    origin: 'http://localhost:5001',
    strictPort: true,
    cors: true,
    fs: {
      // Permitir acesso ao remoteEntry.js
      allow: ['..']
    },
    hmr: {
      // Habilitar HMR via websocket
      protocol: 'ws',
      host: 'localhost',
      port: 5001,
    },
  },
  preview: {
    port: 5001,
    strictPort: true,
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-dom/client',
      '@mui/material',
      '@emotion/react',
      '@emotion/styled',
      'react-router-dom',
    ],
    needsInterop: [
      'react',
      'react-dom',
      '@mui/material',
      'react-router-dom',
      '@emotion/react',
      '@emotion/styled',
      '__mf__virtual/modulo1__prebuild__react__prebuild__.js',
      '__mf__virtual/modulo1__prebuild__react_mf_2_dom__prebuild__.js',
      '__mf__virtual/modulo1__prebuild___mf_0_mui_mf_1_material__prebuild__.js',
      '__mf__virtual/modulo1__prebuild__react_mf_2_router_mf_2_dom__prebuild__.js'
    ],
    esbuildOptions: {
      target: 'esnext',
    },
  },
})
