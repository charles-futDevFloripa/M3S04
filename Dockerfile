# Usa uma imagem oficial do Node.js
FROM node:18-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o arquivo package.json e package-lock.json
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o código do projeto para o diretório de trabalho
COPY . .

# Gera a build de produção do projeto
RUN npm run build

# Exposição da porta onde o Vite serve o projeto (pode ser configurada para 3000 ou 5173, dependendo do ambiente)
EXPOSE 4173

# Comando para rodar a aplicação (preview em produção)
CMD ["npm", "run", "preview", "--", "--host"]
