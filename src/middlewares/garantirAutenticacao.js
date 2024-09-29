require('dotenv').config();
const { verify } = require('jsonwebtoken');

function garantirAutenticacaoRBAC(permissaoParametro) {
  return (request, response, next) => {
    const { authorization } = request.headers;
    if (!authorization)
      return response.status(401).json({ message: 'Token não encontrado!' });

    const [, token] = authorization.split(' ');
    try {
      const decoded = verify(token, process.env.JWT_SECRET); // Usando a chave secreta do .env
      const { permissao } = decoded;

      if (permissao !== permissaoParametro) {
        return response
          .status(403)
          .json({ message: 'Acesso negado: permissão insuficiente!' });
      }

      request.usuario = { id: decoded.sub, permissao };
      next();
    } catch (error) {
      return response.status(401).json({ message: 'Token inválido!' });
    }
  };
}

module.exports = { garantirAutenticacaoRBAC };
