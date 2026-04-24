const { Router } = require('express');
const { getModelos, addModelo, updateModelo, deleteModelo, getModeloPorCodigo } = require('../controllers/modeloController');
const { verificaJWT } = require('../controllers/segurancaController');

const rotasModelos = new Router();

/**
 * @openapi
 * /modelo:
 * get:
 * summary: Retorna todos os modelos
 * tags: [Modelos]
 * security:
 * - bearerAuth: []
 * responses:
 * 200:
 * description: Lista de modelos obtida com sucesso
 * post:
 * summary: Cria um novo modelo
 * tags: [Modelos]
 * security:
 * - bearerAuth: []
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required:
 * - nome
 * - marca_id
 * properties:
 * nome:
 * type: string
 * example: "Corolla"
 * marca_id:
 * type: integer
 * example: 1
 * responses:
 * 200:
 * description: Modelo criado com sucesso
 * put:
 * summary: Atualiza um modelo existente
 * tags: [Modelos]
 * security:
 * - bearerAuth: []
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required:
 * - codigo
 * - nome
 * - marca_id
 * properties:
 * codigo:
 * type: integer
 * nome:
 * type: string
 * marca_id:
 * type: integer
 * responses:
 * 200:
 * description: Modelo atualizado com sucesso
 *  /modelo/{codigo}:
 * get:
 * summary: Retorna um modelo específico pelo código
 * tags: [Modelos]
 * security:
 * - bearerAuth: []
 * parameters:
 * - in: path
 * name: codigo
 * required: true
 * schema:
 * type: integer
 * responses:
 * 200:
 * description: Dados do modelo
 * delete:
 * summary: Remove um modelo
 * tags: [Modelos]
 * security:
 * - bearerAuth: []
 * parameters:
 * - in: path
 * name: codigo
 * required: true
 * schema:
 * type: integer
 * responses:
 * 200:
 * description: Modelo removido com sucesso
 */

// Definindo as rotas para modelos
rotasModelos.route('/modelo')
    .get(verificaJWT, getModelos)
    .post(verificaJWT, addModelo)
    .put(verificaJWT, updateModelo);

rotasModelos.route('/modelo/:codigo')
    .delete(verificaJWT, deleteModelo)
    .get(verificaJWT, getModeloPorCodigo);

module.exports = { rotasModelos };
