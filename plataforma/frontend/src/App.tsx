import { useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import ExtensionIcon from '@mui/icons-material/Extension';
import CircularProgress from '@mui/material/CircularProgress';

import './App.css';
import HomePage from './pages/Home';

// Tratamento de erro para o módulo remoto
const ErrorFallback = () => (
  <Box sx={{ p: 3, textAlign: 'center' }}>
    <Typography variant="h5" color="error" gutterBottom>
      Erro ao carregar o módulo
    </Typography>
    <Typography variant="body1">
      Não foi possível carregar o Módulo 1. Verifique se o servidor do módulo está em execução.
    </Typography>
  </Box>
);

// Componente de carregamento genérico
const LoadingComponent = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
    <CircularProgress size={60} />
    <Typography variant="h6" component="div" sx={{ ml: 2 }}>
      Carregando módulo...
    </Typography>
  </Box>
);

// Carrega o módulo remoto com tratamento de erro
const Modulo1Page = lazy(() => {
  return new Promise((resolve) => {
    // Tenta carregar o módulo por até 10 segundos
    const timeout = setTimeout(() => {
      console.error('Timeout ao carregar o módulo remoto');
      resolve({ default: ErrorFallback });
    }, 10000);

    // Tenta importar o módulo
    import('modulo1/Modulo1Pagina')
      .then((module) => {
        clearTimeout(timeout);
        resolve(module);
      })
      .catch((error) => {
        clearTimeout(timeout);
        console.error('Erro ao carregar módulo:', error);
        resolve({ default: ErrorFallback });
      });
  });
});

const drawerWidth = 240;

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Plataforma Central
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/modulo1">
            <ListItemIcon>
              <ExtensionIcon />
            </ListItemIcon>
            <ListItemText primary="Módulo 1" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="abrir drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              AppShell - Microfrontend
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="menu itens"
        >
          {/* Drawer para dispositivos móveis */}
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Melhor desempenho em dispositivos móveis
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
          {/* Drawer para desktop */}
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
          <Toolbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route 
              path="/modulo1/*" 
              element={
                <Suspense fallback={<LoadingComponent />}>
                  <Modulo1Page />
                </Suspense>
              } 
            />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
