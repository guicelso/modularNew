import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Pagina from './components/Pagina';
import './App.css';

// Aplicação principal do módulo
// Pode ser usado quando o módulo é executado isoladamente
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Pagina />} />
      </Routes>
    </Router>
  );
};

export default App;
