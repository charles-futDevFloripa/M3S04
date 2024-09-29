const usuarioModel = require('../../database/models/usuarios');
const { compare } = require('bcrypt');
const { sign } = require('jsonwebtoken');
require('dotenv').config();

class SessionServices {
  async create({ email, senha }) {
    const usuario = await usuarioModel.findOne({ where: { email } });
    if (!usuario) return null;

    const senhaCriptografada = await compare(senha, usuario.senha);
    if (!senhaCriptografada) return null;

    const token = sign(
      { permissao: usuario.permissao },
      process.env.JWT_SECRET,
      {
        subject: usuario.id,
        expiresIn: '1d',
      }
    );

    return { usuario, token };
  }
}

module.exports = SessionServices;
