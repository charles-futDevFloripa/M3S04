const { verify } = require('jsonwebtoken');

require('dotenv').config(); // Carregar variáveis do .env

/**
 * Middleware para garantir que o usuário tem uma permissão específica
 * @param {string} permitirApenas Permissão necessária para acessar a rota
 * @returns {import('express').RequestHandler}
 */
function garantirAutenticao(permitirApenas) {
  return (request, response, next) => {
    const { authorization } = request.headers;

    if (!authorization) {
      return response.status(401).json({ message: 'Token não encontrado!' });
    }

    // Extrair o token do cabeçalho "Authorization"
    const [, token] = authorization.split(' ');

    try {
      // Verificar e decodificar o token
      const decoded = verify(token, process.env.JWT_SECRET);

      const { sub, permissao } = decoded; // Extraindo a permissão do payload do token

      if (permitirApenas !== permissao) {
        return response
          .status(403)
          .json({ message: 'Acesso negado: permissão insuficiente!' });
      }

      // Adiciona os dados do usuário no request para serem usados nas rotas
      request.user = {
        id: sub,
        permissao,
      };

      next(); // Passa para a próxima função (rota)
    } catch (error) {
      return response
        .status(401)
        .json({ message: 'Token inválido ou expirado!' });
    }
  };
}

module.exports = {
  garantirAutenticao,
};
