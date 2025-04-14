import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { federation } from '@module-federation/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'plataforma_shell',
      filename: 'remoteEntry.js',
      remotes: {
        modulo1: "modulo1@http://localhost:5001/remoteEntry.js",
      },
      shared: {
        react: { singleton: true, requiredVersion: '^18.2.0' },
        'react-dom': { singleton: true, requiredVersion: '^18.2.0' },
        'react-router-dom': { singleton: true },
        '@mui/material': { singleton: true },
        '@emotion/react': { singleton: true },
        '@emotion/styled': { singleton: true },
      },
      exposes: {},
    }),
  ],
  server: {
    port: 5000,
    origin: 'http://localhost:5000',
    strictPort: true,
    cors: true,
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5000,
    },
  },
  preview: {
    port: 5000,
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
      '__mf__virtual/plataforma_shell__prebuild__react__prebuild__.js',
      '__mf__virtual/plataforma_shell__prebuild__react_mf_2_dom__prebuild__.js',
      '__mf__virtual/plataforma_shell__prebuild___mf_0_mui_mf_1_material__prebuild__.js',
      '__mf__virtual/plataforma_shell__prebuild__react_mf_2_router_mf_2_dom__prebuild__.js',
      '__mf__virtual/plataforma_shell__prebuild___mf_0_emotion_mf_1_styled__prebuild__.js',
      '__mf__virtual/plataforma_shell__prebuild___mf_0_emotion_mf_1_react__prebuild__.js'
    ],
    esbuildOptions: {
      target: 'esnext',
    },
  },
})
