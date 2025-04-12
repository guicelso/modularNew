FROM node:20-alpine

WORKDIR /app

# Instala o pnpm
RUN npm install -g pnpm

# Copia os arquivos de configuração
COPY package.json ./

# Instala as dependências, mas ignore os scripts
RUN pnpm install --ignore-scripts

# Copia o arquivo index.js temporário
COPY src/index.js ./src/

# Expõe a porta
EXPOSE 3000

# Comando de inicialização simplificado
CMD ["node", "src/index.js"] 