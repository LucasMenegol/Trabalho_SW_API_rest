const { Router } = require('express');
const { getMarcas, addMarca, updateMarca, deleteMarca, getMarcaPorCodigo } = require('../controllers/marcaController');
const { verificaJWT } = require('../controllers/segurancaController');

const rotasMarcas = new Router();

/**
 * @openapi
 * /marca:
 * get:
 * summary: Retorna todas as marcas
 * tags: [Marcas]
 * security:
 * - bearerAuth: []
 * responses:
 * 200:
 * description: Lista de marcas obtida com sucesso
 * post:
 * summary: Cria uma nova marca
 * tags: [Marcas]
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
 * properties:
 * nome:
 * type: string
 * example: "Toyota"
 * responses:
 * 200:
 * description: Marca criada com sucesso
 * put:
 * summary: Atualiza uma marca existente
 * tags: [Marcas]
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
 * properties:
 * codigo:
 * type: integer
 * nome:
 * type: string
 * responses:
 * 200:
 * description: Marca atualizada com sucesso
 */
rotasMarcas.route('/marca')
    .get(verificaJWT, getMarcas)
    .post(verificaJWT, addMarca)
    .put(verificaJWT, updateMarca);

/**
 * @openapi
 * /marca/{codigo}:
 * get:
 * summary: Retorna uma marca específica pelo código
 * tags: [Marcas]
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
 * description: Dados da marca
 * delete:
 * summary: Remove uma marca
 * tags: [Marcas]
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
 * description: Marca removida com sucesso
 */
rotasMarcas.route('/marca/:codigo')
    .delete(verificaJWT, deleteMarca)
    .get(verificaJWT, getMarcaPorCodigo);

module.exports = { rotasMarcas };