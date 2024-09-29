const { Router } = require('express');
const yup = require('yup');

const UsuariosControllers = require('./usuarios.controllers');
const { validarSchema } = require('../../middlewares/validacaoRotas');
const usuarioRouter = Router();
const usuariosControllers = new UsuariosControllers();

const schemaPostUsuario = yup.object({
  body: yup.object({
    nome: yup.string().required('Nome é obrigatório'),
    sobrenome: yup.string(),
    permissao: yup
      .string()
      .oneOf(['criador', 'estudante'], 'Informe um tipo válido para o usuário')
      .required('Informe o tipo de usuário'),
    email: yup
      .string()
      .email('E-mail informado não é valido')
      .required('Email é obrigatório'),
    senha: yup
      .string()
      .min(3, 'Minimo de 3 caracteres')
      .max(16, 'Maximo de 16 caracteres')
      .required('Senha é obrigatória'),
  }),
});

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: O ID do usuário
 *                   nome:
 *                     type: string
 *                     description: O nome do usuário
 *                   email:
 *                     type: string
 *                     description: O e-mail do usuário
 *                   permissao:
 *                     type: string
 *                     description: Permissão do usuário (criador ou estudante)
 *       401:
 *         description: Não autorizado
 */
usuarioRouter.get('/', usuariosControllers.index);

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome do usuário
 *                 example: João
 *               sobrenome:
 *                 type: string
 *                 description: Sobrenome do usuário
 *                 example: Silva
 *               permissao:
 *                 type: string
 *                 description: Permissão do usuário (criador ou estudante)
 *                 example: criador
 *               email:
 *                 type: string
 *                 description: E-mail do usuário
 *                 example: joao@example.com
 *               senha:
 *                 type: string
 *                 description: Senha do usuário (mínimo 3, máximo 16 caracteres)
 *                 example: senha123
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 */
usuarioRouter.post(
  '/',
  validarSchema(schemaPostUsuario),
  usuariosControllers.create
);

/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     summary: Deleta um usuário pelo ID
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: O ID do usuário
 *     responses:
 *       204:
 *         description: Usuário deletado com sucesso
 *       404:
 *         description: Usuário não encontrado
 *       401:
 *         description: Não autorizado
 */
usuarioRouter.delete('/:id', usuariosControllers.delete);

module.exports = usuarioRouter;
