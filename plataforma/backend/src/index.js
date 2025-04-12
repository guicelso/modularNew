// Este é um arquivo temporário para o Docker build
// O verdadeiro arquivo será substituído quando o projeto for desenvolvido

// Criando um servidor HTTP simples que permanece em execução
const http = require('http');

const PORT = process.env.PORT || 3000;

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

  // Endpoint de health check
  if (req.url === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', service: 'platform-backend' }));
    return;
  }
  
  // Endpoint de módulos
  if (req.url === '/api/modules/discover') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      modules: [
        {
          id: 'modulo1',
          name: 'Primeiro Módulo',
          basePath: '/modulos/modulo1',
          apiPath: '/api/modulos/modulo1',
          entryPoint: '/modulos/modulo1/remoteEntry.js',
        }
      ]
    }));
    return;
  }

  // Rota padrão
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Rota não encontrada' }));
});

server.listen(PORT, () => {
  console.log(`Plataforma Backend está rodando na porta ${PORT}`);
}); 