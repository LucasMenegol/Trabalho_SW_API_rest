const { Router } = require('express');
const { rotasMarcas } = require('./rotasMarcas');
const { rotasModelos } = require('./rotasModelos');
const { login } = require('../controllers/segurancaController');

const rotas = new Router();

/**
 * @openapi
 * /login:
 * post:
 * summary: Autentica o usuário e retorna o token JWT
 * tags: [Segurança]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required:
 * - email
 * - senha
 * properties:
 * email:
 * type: string
 * example: "admin@teste.com"
 * senha:
 * type: string
 * example: "123456"
 * responses:
 * 200:
 * description: Login realizado com sucesso
 * 401:
 * description: Usuário ou senha inválidos
 */
rotas.route("/login").post(login);

// Registrando os outros arquivos de rotas
rotas.use(rotasMarcas);
rotas.use(rotasModelos);

module.exports = rotas;
