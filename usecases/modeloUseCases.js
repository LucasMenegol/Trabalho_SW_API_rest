const { pool } = require('../config'); // Importa o pool de conexão
const Modelo = require('../entities/modelo'); // Classe Modelo

const getModelosDB = async () => {
    try {
        const { rows } = await pool.query(
            `SELECT m.codigo, m.nome, m.marca_id, ma.nome AS marca_nome 
             FROM modelos m 
             JOIN marcas ma ON m.marca_id = ma.codigo 
             ORDER BY m.nome`
        );
        return rows.map((modelo) => new Modelo(modelo.codigo, modelo.nome, modelo.marca_id, modelo.marca_nome));
    } catch (err) {
        throw new Error("Erro ao listar modelos: " + err.message);
    }
};


// Função para adicionar um modelo
const addModeloDB = async (body) => {
    try {
        const { nome, marca_id } = body;

        // Validações básicas
        if (!nome) throw new Error("O campo 'nome' é obrigatório.");
        if (!marca_id) throw new Error("O campo 'marca_id' é obrigatório.");

        const results = await pool.query(
            `INSERT INTO modelos (nome, marca_id) VALUES ($1, $2) RETURNING codigo, nome, marca_id`,
            [nome, marca_id]
        );

        return new Modelo(results.rows[0].codigo, results.rows[0].nome, results.rows[0].marca_id);
    } catch (err) {
        throw new Error("Erro ao adicionar o modelo: " + err.message);
    }
};

// Função para atualizar um modelo
const updateModeloDB = async (body) => {
    try {
        const { codigo, nome, marca_id } = body;

        // Validações básicas
        if (!codigo) throw new Error("O campo 'codigo' é obrigatório.");
        if (!nome) throw new Error("O campo 'nome' é obrigatório.");
        if (!marca_id) throw new Error("O campo 'marca_id' é obrigatório.");

        const results = await pool.query(
            `UPDATE modelos SET nome = $2, marca_id = $3 WHERE codigo = $1 RETURNING codigo, nome, marca_id`,
            [codigo, nome, marca_id]
        );

        if (results.rowCount === 0) {
            throw new Error(`Nenhum modelo encontrado com o código ${codigo}`);
        }
        return new Modelo(results.rows[0].codigo, results.rows[0].nome, results.rows[0].marca_id);
    } catch (err) {
        throw new Error("Erro ao atualizar o modelo: " + err.message);
    }
};

// Função para excluir um modelo
const deleteModeloDB = async (codigo) => {
    try {
        if (!codigo) throw new Error("O campo 'codigo' é obrigatório.");

        const results = await pool.query(`DELETE FROM modelos WHERE codigo = $1`, [codigo]);

        if (results.rowCount === 0) {
            throw new Error(`Nenhum modelo encontrado com o código ${codigo}`);
        }
        return "Modelo removido com sucesso!";
    } catch (err) {
        throw new Error("Erro ao remover o modelo: " + err.message);
    }
};

// Função para obter um modelo pelo código
const getModeloPorCodigoDB = async (codigo) => {
    try {
        const results = await pool.query(`SELECT m.codigo, m.nome, m.marca_id, ma.nome AS marca_nome 
                                          FROM modelos m 
                                          JOIN marcas ma ON m.marca_id = ma.codigo 
                                          WHERE m.codigo = $1`, [codigo]);

        if (results.rowCount === 0) {
            throw new Error(`Nenhum modelo encontrado com o código ${codigo}`);
        } else {
            const modelo = results.rows[0];
            return new Modelo(modelo.codigo, modelo.nome, modelo.marca_id);
        }
    } catch (err) {
        throw new Error("Erro ao recuperar o modelo: " + err.message);
    }
};

module.exports = { getModelosDB, addModeloDB, updateModeloDB, deleteModeloDB, getModeloPorCodigoDB };
