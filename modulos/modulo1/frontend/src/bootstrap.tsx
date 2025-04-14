import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import App from './App';
import './index.css';

// Criando um tema personalizado para o módulo
const theme = createTheme({
  palette: {
    primary: {
      main: '#ff9800',
    },
    secondary: {
      main: '#9c27b0',
    },
  },
});

// Verifica se existe um elemento root para renderizar
// Isso é necessário pois o módulo pode ser carregado tanto isoladamente
// quanto como parte da federação
const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </StrictMode>,
  );
} 