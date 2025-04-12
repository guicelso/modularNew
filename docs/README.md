# Plataforma Modular

Esta é uma plataforma modular que permite a integração de diferentes módulos de forma dinâmica.

## Estrutura do Projeto

```
.
├── config/                 # Configurações gerais do projeto
├── docker/                 # Arquivos Docker adicionais
├── docs/                   # Documentação
├── modulos/                # Módulos da plataforma
│   └── modulo1/           # Exemplo de módulo
│       ├── backend/       # Backend do módulo
│       └── frontend/      # Frontend do módulo
├── plataforma/            # Plataforma principal
│   ├── backend/           # Backend da plataforma
│   └── frontend/          # Frontend da plataforma
├── scripts/               # Scripts utilitários
├── docker-compose.yml     # Configuração Docker Compose
└── README.md              # Documentação principal
```

## Requisitos

- Node.js 18+
- Docker e Docker Compose
- MongoDB

## Configuração

1. Clone o repositório
2. Configure os arquivos `.env` em cada diretório conforme necessário
3. Execute `docker-compose up` para iniciar todos os serviços

## Desenvolvimento

### Executando em Ambiente de Desenvolvimento

```bash
# Plataforma
cd plataforma/frontend && npm run dev
cd plataforma/backend && npm run dev

# Módulo 1
cd modulos/modulo1/frontend && npm run dev
cd modulos/modulo1/backend && npm run dev
```

### Testes

```bash
# Teste de integração
./scripts/test-integration.js
```

## Adicionando um Novo Módulo

Para adicionar um novo módulo à plataforma, siga estas etapas:

1. Crie uma nova pasta dentro de `modulos/` com o nome do seu módulo
2. Dentro dela, crie as pastas `frontend` e `backend`
3. Configure os arquivos necessários:
   - `.env` para frontend e backend
   - `Dockerfile` para frontend e backend
   - `webpack.config.js` para o frontend (com Module Federation)
   - `nginx.conf` para o frontend

4. Implemente os componentes expostos:
   - `Module.js` - Componente principal do módulo
   - `routes.js` - Rotas do módulo

5. Adicione o serviço ao `docker-compose.yml`

6. Reinicie os serviços

## Arquitetura

A plataforma utiliza:

- **Module Federation**: Para carregamento dinâmico de módulos no frontend
- **Traefik**: Como gateway e para service discovery
- **Nginx**: Para servir arquivos estáticos
- **Docker Compose**: Para orquestração de serviços

## Documentação Adicional

- [Guia de Desenvolvimento](./developer-guide.md)
- [Configurações](./configuration.md)
- [Serviço de Descoberta](./service-discovery.md) 