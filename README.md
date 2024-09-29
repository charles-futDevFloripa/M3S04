# Exercícios M3S02 - Questionários Simplificados

Este repositório contém os exercícios de referência ao projeto **Questionários Simplificados** . Os exercícios envolvem a criação de uma API com Node.js, Express, Sequelize, e JWT para autenticação. A API foi documentada utilizando Swagger.

## Instruções para execução

### 1. Clonar o repositório

```bash
git clone https://github.com/charles-futDevFloripa/M3S02.git
cd M3S02
```

### 2. Instalar dependências

Para instalar todas as dependências do projeto, execute:

```bash
npm install
```

### 3. Configurar o banco de dados

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis de ambiente:

```
DIALECT=postgres
DATABASE_HOST=localhost
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=db-questionarios
DATABASE_PORT=5432
PORT_API=3000
JWT_SECRET=sua_chave_secreta
```

Certifique-se de que o PostgreSQL esteja rodando e com as credenciais correspondentes ao seu ambiente.

### 4. Criar o banco de dados e rodar as migrações

Execute os seguintes comandos para criar o banco de dados e rodar as migrações:

```bash
npx sequelize-cli db:create
npx sequelize-cli db:migrate
```

### 5. Rodar o projeto

Para iniciar o servidor, execute:

```bash
npm start
```

A API estará rodando na URL: `http://localhost:3000`.

### 6. Acessar a documentação Swagger

Acesse a documentação da API pelo Swagger na seguinte URL:

```
http://localhost:3000/api-docs
```

---

## Resumo dos Exercícios

### [M3S02] Ex. 01 - Criação de servidor com Node.js

Criação de um servidor HTTP básico utilizando o pacote nativo `http` do Node.js. Uma rota `/fundamentos` foi criada para responder com "Hello world, fundamentos nodejs aplicado."

### [M3S02] Ex. 02 - Inclusão da permissão no usuário

Foi criada uma nova migration que adiciona a coluna `permissao` na tabela de `usuarios`. A coluna define se o usuário é "criador" ou "estudante".

### [M3S02] Ex. 03 - Cadastrando usuários com permissão

Agora é possível definir a permissão de um usuário ao cadastrá-lo, sendo obrigatório escolher entre "criador" ou "estudante". A validação foi implementada com `yup`.

### [M3S02] Ex. 04 - Tornando rotas privadas com permissão

O middleware de autenticação foi ajustado para garantir que apenas usuários com a permissão adequada (criador ou estudante) possam acessar determinadas rotas, de acordo com as regras do projeto.

### [M3S02] Ex. 05 - Incluindo permissão no JWT

A permissão do usuário foi incluída no payload do JWT. O middleware verifica essa permissão para controlar o acesso às rotas.

### [M3S02] Ex. 06 - Documentação com Swagger

A API foi documentada com Swagger, incluindo a definição dos endpoints, parâmetros e exemplos de respostas. A documentação pode ser acessada via `/api-docs`.

---

## O Aluno

Os exercícios foram resolvidos por [Charles B. Doehl](https://github.com/charles-futDevFloripa)
com base nas revisões do professor: [Nicholas Macedo](https://github.com/nicholasmacedoo)
