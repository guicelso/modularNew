# Guia para Desenvolvedores

Este guia contém informações detalhadas para desenvolvedores trabalhando na plataforma modular.

## Fluxo de Desenvolvimento

1. **Setup do Ambiente**
   - Instale Node.js 18+
   - Instale Docker e Docker Compose
   - Clone o repositório

2. **Executando a Plataforma**
   - Use `docker-compose up` para um ambiente completo
   - Use os scripts de desenvolvimento para execução local

3. **Ciclo de Desenvolvimento**
   - Faça suas alterações
   - Execute testes locais
   - Envie para revisão

## Componentes da Plataforma

### Core Platform

#### Frontend
- React + Vite + TypeScript
- Module Federation para carregamento de módulos
- Serviço de descoberta de módulos

#### Backend
- Node.js + Express
- API RESTful
- Serviço de descoberta de módulos

### Módulos

Cada módulo deve seguir a estrutura padrão:

#### Frontend
- Deve exportar:
  - `Module.js` - Componente principal
  - `routes.js` - Definição de rotas

```javascript
// Module.js
export default function Module() {
  return <div>Meu Módulo</div>;
}

// routes.js
export default [
  {
    path: '/modulos/meu-modulo',
    component: () => import('./pages/Home'),
    exact: true,
  },
  // outras rotas
];
```

#### Backend
- API RESTful
- Deve oferecer um endpoint `/api/health` para health checks

## Integração com Module Federation

### Configuração do Module Federation

A plataforma utiliza Module Federation para carregar módulos dinamicamente:

```javascript
// webpack.config.js do módulo
new ModuleFederationPlugin({
  name: 'meu_modulo',
  filename: 'remoteEntry.js',
  remotes: {
    platform: 'platform@http://localhost:5173/remoteEntry.js',
  },
  exposes: {
    './Module': './src/Module',
    './routes': './src/routes',
  },
  shared: {
    // dependências compartilhadas
  },
}),
```

### Carregamento de Módulos

A plataforma utiliza o serviço `ModuleLoader` para carregar módulos remotos:

```javascript
// Exemplo de uso
import ModuleLoader from './services/ModuleLoader';

// Carregar módulo
const MyModule = await ModuleLoader.loadModule('meu-modulo', 'meu_modulo', 'Module');

// Renderizar
<MyModule />;
```

## Comunicação entre Módulos

### Através da Plataforma

Os módulos podem se comunicar através da plataforma utilizando:

1. **APIs da Plataforma**: Acessíveis via `platform/api`
2. **Event Bus**: Para comunicação baseada em eventos
3. **Estado Compartilhado**: Para compartilhamento de estado quando necessário

### Direta entre Módulos

Não recomendamos a comunicação direta entre módulos. Prefira sempre utilizar a plataforma como intermediária.

## Boas Práticas

1. **Isolamento**: Mantenha os módulos isolados para garantir independência
2. **Contratos Claros**: Defina bem as interfaces entre a plataforma e os módulos
3. **Versionamento**: Versione suas API's e componentes
4. **Testes**: Escreva testes para seus módulos e integrações
5. **Documentação**: Documente seus módulos e suas APIs 