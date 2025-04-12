#!/usr/bin/env node

/**
 * Script para testar a integração entre a plataforma e os módulos
 */

const http = require('http');
const path = require('path');
const fs = require('fs');

// Configura os endpoints para testar
const endpoints = [
  { name: 'Plataforma API', url: 'http://localhost:3000/api/health', expectStatus: 200 },
  { name: 'Módulo 1 API', url: 'http://localhost:3001/api/health', expectStatus: 200 },
  { name: 'Plataforma Frontend', url: 'http://localhost:5173/', expectStatus: 200 },
  { name: 'Módulo 1 Frontend', url: 'http://localhost:5174/', expectStatus: 200 },
  { name: 'Serviço de Descoberta', url: 'http://localhost:3000/api/modules/discover', expectStatus: 200 },
];

// Verifica se os arquivos necessários existem
const requiredFiles = [
  { path: path.join(__dirname, '..', 'plataforma', 'frontend', 'dist', 'remoteEntry.js'), name: 'Plataforma Remote Entry' },
  { path: path.join(__dirname, '..', 'modulos', 'modulo1', 'frontend', 'dist', 'remoteEntry.js'), name: 'Módulo 1 Remote Entry' },
];

// Testa a disponibilidade dos endpoints
async function testEndpoints() {
  console.log('\n=== Testando Endpoints ===\n');
  
  for (const endpoint of endpoints) {
    process.stdout.write(`Testando ${endpoint.name}: ${endpoint.url} ... `);
    
    try {
      const response = await new Promise((resolve, reject) => {
        const req = http.get(endpoint.url, (res) => {
          resolve(res);
        });
        
        req.on('error', (err) => {
          reject(err);
        });
        
        req.end();
      });
      
      if (response.statusCode === endpoint.expectStatus) {
        console.log('✅ OK');
      } else {
        console.log(`❌ FALHA (Status: ${response.statusCode}, Esperado: ${endpoint.expectStatus})`);
      }
    } catch (error) {
      console.log(`❌ ERRO (${error.message})`);
    }
  }
}

// Verifica se os arquivos necessários existem
function checkRequiredFiles() {
  console.log('\n=== Verificando Arquivos ===\n');
  
  for (const file of requiredFiles) {
    process.stdout.write(`Verificando ${file.name}: ${file.path} ... `);
    
    if (fs.existsSync(file.path)) {
      console.log('✅ OK');
    } else {
      console.log('❌ FALHA (Arquivo não encontrado)');
    }
  }
}

// Função principal
async function main() {
  console.log('=== Teste de Integração da Plataforma Modular ===');
  
  await testEndpoints();
  checkRequiredFiles();
  
  console.log('\n=== Teste Concluído ===');
}

// Executa o teste
main().catch(error => {
  console.error('Erro durante o teste:', error);
  process.exit(1);
});