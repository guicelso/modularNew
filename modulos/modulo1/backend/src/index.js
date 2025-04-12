// Este é um arquivo temporário para o Docker build
// O verdadeiro arquivo será substituído quando o projeto for desenvolvido

// Criando um servidor HTTP simples que permanece em execução
const http = require('http');

const PORT = process.env.PORT || 3001;
const API_PREFIX = '/api/modulos/modulo1';

const server = http.createServer((req, res) => {
  console.log(`Recebida requisição: ${req.method} ${req.url}`);
  
  // Configurar cabeçalhos CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Remove o prefixo da URL para processamento interno
  const cleanUrl = req.url.startsWith(API_PREFIX) 
    ? req.url.substring(API_PREFIX.length) 
    : req.url;
  
  // Endpoint de health check
  if (cleanUrl === '/health' || req.url === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', service: 'modulo1-backend' }));
    return;
  }
  
  // Endpoint de informações do módulo
  if (cleanUrl === '/info' || req.url === '/api/info') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      moduleId: 'modulo1',
      name: 'Primeiro Módulo',
      version: '0.1.0',
      capabilities: ['feature1', 'feature2']
    }));
    return;
  }

  // Rota padrão
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Rota não encontrada', url: req.url, cleanUrl }));
});

server.listen(PORT, () => {
  console.log(`Módulo 1 Backend está rodando na porta ${PORT}`);
}); 