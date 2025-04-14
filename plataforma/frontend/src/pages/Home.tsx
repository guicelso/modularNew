import React from 'react';
import { Typography, Paper, Box } from '@mui/material';

const HomePage: React.FC = () => {
  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 4, 
        borderRadius: 2,
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Typography variant="h3" component="h1" gutterBottom align="center" color="primary">
        Bem-vindo à Plataforma Central
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom align="center">
        Essa é a página inicial do AppShell
      </Typography>
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="body1" paragraph>
          Este é um exemplo de microfrontend horizontal usando Module Federation.
        </Typography>
        <Typography variant="body1" paragraph>
          Use o menu lateral para navegar entre a Home e o Módulo 1.
        </Typography>
      </Box>
    </Paper>
  );
};

export default HomePage; 