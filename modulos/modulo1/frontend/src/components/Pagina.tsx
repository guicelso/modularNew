import React from 'react';
import { Typography, Paper, Box, Button } from '@mui/material';

const Pagina: React.FC = () => {
  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 4, 
        borderRadius: 2,
        background: 'linear-gradient(135deg, #FFEFBA 0%, #FFFFFF 100%)',
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Typography variant="h3" component="h1" gutterBottom align="center" color="secondary">
        Módulo 1
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom align="center">
        Esta é a página do Módulo 1
      </Typography>
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="body1" paragraph>
          Este conteúdo é carregado remotamente do Módulo 1 via Module Federation.
        </Typography>
        <Typography variant="body1" paragraph>
          A página está sendo renderizada dentro do AppShell da plataforma central.
        </Typography>
        <Button 
          variant="contained" 
          color="secondary" 
          sx={{ mt: 2 }}
        >
          Botão do Módulo 1
        </Button>
      </Box>
    </Paper>
  );
};

export default Pagina; 