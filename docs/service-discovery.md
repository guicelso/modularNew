# Serviço de Descoberta de Módulos

Este documento descreve o funcionamento do serviço de descoberta de módulos na plataforma.

## Visão Geral

O serviço de descoberta de módulos é responsável por:

1. Identificar os módulos disponíveis na plataforma
2. Fornecer informações sobre esses módulos
3. Permitir o carregamento dinâmico de módulos no frontend

## Componentes

### Backend

O serviço de descoberta no backend consiste em:

- **ModuleDiscoveryService**: Classe responsável por escanear os módulos disponíveis
- **API Endpoints**: Rotas para acessar informações sobre os módulos

```javascript
// Exemplo de uso da API
GET /api/modules/discover
// Retorna:
{
  "modules": [
    {
      "id": "modulo1",
      "name": "Primeiro Módulo",
      "basePath": "/modulos/modulo1",
      "apiPath": "/api/modulos/modulo1",
      "entryPoint": "/modulos/modulo1/remoteEntry.js"
    }
  ]
}
```

### Frontend

No frontend, o serviço de descoberta é implementado pelo:

- **ModuleLoader**: Classe responsável por carregar módulos dinamicamente

## Funcionamento

### Inicialização

1. Durante a inicialização do backend, o `ModuleDiscoveryService` escaneia o diretório de módulos
2. Cada módulo é registrado com suas informações básicas
3. O serviço disponibiliza essas informações via API

### Carregamento de Módulos

1. O frontend consulta a API para obter a lista de módulos disponíveis
2. Para cada módulo, o `ModuleLoader` carrega dinamicamente o script remoto
3. Os componentes e rotas do módulo são integrados à plataforma

## Implementação

### Backend

```javascript
// Exemplo simplificado do serviço
class ModuleDiscoveryService {
  constructor() {
    this.modulesDir = process.env.MODULES_DIR || '../../modulos';
    this.modules = [];
    this.scanModules();
  }

  scanModules() {
    // Lógica para escanear os módulos
  }

  getModules() {
    return this.modules;
  }
}
```

### Frontend

```javascript
// Exemplo simplificado do loader
class ModuleLoader {
  async fetchModules() {
    const response = await fetch('/api/modules/discover');
    const data = await response.json();
    return data.modules || [];
  }

  async loadModule(moduleId, scope, module) {
    // Lógica para carregar o módulo
  }
}
```

## Como Adicionar um Novo Módulo

Para que um novo módulo seja detectado pelo serviço de descoberta:

1. Crie uma pasta com o nome do módulo dentro do diretório `modulos/`
2. Adicione as pastas `frontend` e `backend`
3. Configure o arquivo `.env` no backend com:
   ```
   MODULE_ID=nome-do-modulo
   MODULE_NAME=Nome Amigável do Módulo
   ```
4. Configure o frontend para expor os componentes necessários via Module Federation
5. Reinicie o serviço de backend ou chame `POST /api/modules/refresh`

## Observações

- O serviço escaneia apenas o primeiro nível de diretórios em `modulos/`
- Cada módulo deve seguir a estrutura padrão para ser detectado corretamente
- As informações de configuração são obtidas dos arquivos `.env` dos módulos 