const { Router } = require('express');
const yup = require('yup');

const QuestionariosControllers = require('./questionarios.controllers');
const { validarSchema } = require('../../middlewares/validacaoRotas');
const { garantirAutenticao } = require('../../middlewares/auth');

const questionariosRouter = Router();
const questionariosControllers = new QuestionariosControllers();

const schemaPostQuestionario = yup.object({
  body: yup.object({
    titulo: yup.string().required('Titulo é obrigatório'),
    descricao: yup.string().required('Descrição é obrigatório'),
    perguntas: yup.array(
      yup.object({
        descricao: yup
          .string()
          .required('Descrição da pergunta pergunta é obrigatória'),
      })
    ),
  }),
});

const schemaDeleteQuestionario = yup.object({
  params: yup.object({
    id: yup
      .string()
      .uuid('Id informado não é valido!')
      .required('Id é obrigatório'),
  }),
});

const garantirAutenticacaoCriador = garantirAutenticao('criador');

questionariosRouter.use(garantirAutenticacaoCriador);

/**
 * @swagger
 * /questionarios:
 *   get:
 *     summary: Lista todos os questionários
 *     tags: [Questionários]
 *     responses:
 *       200:
 *         description: Lista de questionários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID do questionário
 *                   titulo:
 *                     type: string
 *                     description: Título do questionário
 *                   descricao:
 *                     type: string
 *                     description: Descrição do questionário
 *                   perguntas:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         descricao:
 *                           type: string
 *                           description: Descrição da pergunta
 *       401:
 *         description: Não autorizado
 */
questionariosRouter.get('/', questionariosControllers.index);

/**
 * @swagger
 * /questionarios/respostas:
 *   get:
 *     summary: Retorna questionários com respostas
 *     tags: [Questionários]
 *     responses:
 *       200:
 *         description: Lista de questionários com perguntas e respostas
 *       401:
 *         description: Não autorizado
 */
questionariosRouter.get('/respostas', questionariosControllers.all);

/**
 * @swagger
 * /questionarios:
 *   post:
 *     summary: Cria um novo questionário
 *     tags: [Questionários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 description: O título do questionário
 *                 example: Questionário de Ciências
 *               descricao:
 *                 type: string
 *                 description: A descrição do questionário
 *                 example: Um questionário sobre ciências básicas
 *               perguntas:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     descricao:
 *                       type: string
 *                       description: A descrição da pergunta
 *                       example: O que é fotossíntese?
 *     responses:
 *       201:
 *         description: Questionário criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 */
questionariosRouter.post(
  '/',
  validarSchema(schemaPostQuestionario),
  questionariosControllers.create
);

/**
 * @swagger
 * /questionarios/{id}:
 *   delete:
 *     summary: Deleta um questionário pelo ID
 *     tags: [Questionários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do questionário
 *     responses:
 *       204:
 *         description: Questionário deletado com sucesso
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Questionário não encontrado
 *       401:
 *         description: Não autorizado
 */
questionariosRouter.delete(
  '/:id',
  validarSchema(schemaDeleteQuestionario),
  questionariosControllers.delete
);

module.exports = questionariosRouter;
