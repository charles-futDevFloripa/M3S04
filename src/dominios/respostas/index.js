const { Router } = require('express');
const RespostasControllers = require('./respostas.controllers');
const { garantirAutenticao } = require('../../middlewares/auth');

const respostasRouter = Router();
const respostasControllers = new RespostasControllers();

const garantirAutenticacaoEstudante = garantirAutenticao('estudante');

// Aplica a autenticação para todas as rotas
respostasRouter.use(garantirAutenticacaoEstudante);

/**
 * @swagger
 * /respostas/{perguntaId}:
 *   post:
 *     summary: Envia uma resposta para uma pergunta específica
 *     tags: [Respostas]
 *     parameters:
 *       - in: path
 *         name: perguntaId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da pergunta a ser respondida
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               resposta:
 *                 type: string
 *                 description: O texto da resposta
 *                 example: Esta é a minha resposta
 *     responses:
 *       201:
 *         description: Resposta enviada com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Permissão insuficiente
 */
respostasRouter.post('/:perguntaId', respostasControllers.create);

module.exports = respostasRouter;
