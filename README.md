# Plataforma Modular

Sistema modular com arquitetura de microfrontends e microserviços, permitindo a integração dinâmica de módulos independentes.

## Características

- **Arquitetura Modular**: Adicione novos módulos sem modificar o core
- **Microfrontends**: Utilizando Module Federation para carregamento dinâmico
- **Gateway API**: Com Traefik para roteamento inteligente
- **Service Discovery**: Detecção automática de novos módulos
- **Containerização**: Componentes isolados em containers Docker

## Estrutura

```
.
├── plataforma/            # Core da plataforma
│   ├── frontend/         # Interface principal (shell)
│   └── backend/          # API principal
├── modulos/               # Módulos independentes
│   └── modulo1/          # Exemplo de módulo
├── docker-compose.yml     # Orquestração de serviços
└── docs/                  # Documentação
```

## Primeiros Passos

1. **Instalação**
   ```bash
   git clone https://github.com/seu-usuario/plataforma-modular.git
   cd plataforma-modular
   ```

2. **Executar com Docker**
   ```bash
   docker compose up -d
   ```

3. **Acessar**
   - Plataforma: http://localhost:80
   - Dashboard Traefik: http://localhost:8080
   - API da Plataforma: http://localhost/api/health
   - API do Módulo 1: http://localhost/api/modulos/modulo1/health

## Como Adicionar um Novo Módulo

1. Crie uma nova pasta dentro de `modulos/` com o nome do seu módulo
2. Adicione as pastas `frontend` e `backend`
3. Configure os arquivos necessários (Dockerfiles, .env, etc.)
4. Adicione o serviço ao `docker-compose.yml`

## Documentação

Para mais informações, consulte a [documentação completa](./docs/README.md).

## Licença

MIT 