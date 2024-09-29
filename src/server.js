// Carrega as variáveis de ambiente
require('dotenv').config();

// Importações principais
const express = require('express');
const database = require('./database/config');
const { swaggerUi, swaggerSpec } = require('./config/swagger');

const usuarioRouter = require('./dominios/usuarios');
const questionariosRouter = require('./dominios/questionarios');
const sessionsRouter = require('./dominios/sessions');
const respostasRouter = require('./dominios/respostas');

const app = express();

app.use(express.json());

/** Swagger Documentation */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/** DEFINIÇÃO DE ROTAS */

// Rotas de Sessão (Login)
app.use('/sessions', sessionsRouter);

// Rotas de Usuários (Cadastro e gerenciamento de usuários)
app.use('/usuarios', usuarioRouter);

// Rotas de Questionários (Protegidas por autenticação)
app.use('/questionarios', questionariosRouter);

// Rotas de Respostas (Protegidas por autenticação)
app.use('/respostas', respostasRouter);

// Middleware para rotas inexistentes (404)
app.use((req, res, next) => {
  res.status(404).json({ message: 'Rota não encontrada' });
});

// Tratamento de erros gerais
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Ocorreu um erro no servidor' });
});

/** INICIALIZAÇÃO DO SERVIDOR */
async function iniciarServidor() {
  try {
    // Conexão com o banco de dados
    await database.authenticate();
    console.log('Banco de dados inicializado com sucesso!');

    // Iniciar o servidor na porta definida no .env ou 3333
    const PORT = process.env.PORT_API || 3333;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao inicializar o servidor:', error);
  }
}

// Iniciar o servidor
iniciarServidor();
