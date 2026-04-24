const { pool } = require('../config'); // Importa o pool de conexão
const Marca = require('../entities/marca'); // Classe Marca

// Função para obter todas as marcas
const getMarcasDB = async () => {
    try {
        const { rows } = await pool.query(`SELECT * FROM marcas ORDER BY nome`);
        return rows.map((marca) => new Marca(marca.codigo, marca.nome)); // Mapeia para a classe Marca
    } catch (err) {
        throw new Error("Erro ao listar marcas: " + err.message); // Detalha o erro
    }
};

// Função para adicionar uma marca
const addMarcaDB = async (body) => {
    try {
        const { nome } = body;

        // Verifica se o nome foi enviado
        if (!nome) throw new Error("O campo 'nome' é obrigatório.");

        const results = await pool.query(
            `INSERT INTO marcas (nome) VALUES ($1) RETURNING codigo, nome`,
            [nome]
        );
        return new Marca(results.rows[0].codigo, results.rows[0].nome);
    } catch (err) {
        throw new Error("Erro ao adicionar a marca: " + err.message);
    }
};

// Função para atualizar uma marca
const updateMarcaDB = async (body) => {
    try {
        const { codigo, nome } = body;

        // Verificação de dados
        console.log("Dados recebidos para atualização:", body);

        if (!codigo || !nome) {
            throw new Error("Os campos 'codigo' e 'nome' são obrigatórios.");
        }

        const results = await pool.query(
            `UPDATE marcas SET nome = $2 WHERE codigo = $1 RETURNING codigo, nome`,
            [codigo, nome]
        );

        if (results.rowCount === 0) {
            throw new Error(`Nenhuma marca encontrada com o código ${codigo}`);
        }

        console.log("Marca atualizada com sucesso:", results.rows[0]);
        return new Marca(results.rows[0].codigo, results.rows[0].nome);
    } catch (err) {
        console.error("Erro ao atualizar marca:", err);
        throw new Error("Erro ao atualizar a marca: " + err.message);
    }
};

// Função para deletar uma marca
const deleteMarcaDB = async (codigo) => {
    try {
        if (!codigo) throw new Error("O campo 'codigo' é obrigatório.");

        const results = await pool.query(`DELETE FROM marcas WHERE codigo = $1`, [codigo]);

        if (results.rowCount === 0) {
            throw new Error(`Nenhuma marca encontrada com o código ${codigo}`);
        }
        return "Marca removida com sucesso!";
    } catch (err) {
        throw new Error("Erro ao remover a marca: " + err.message);
    }
};

// Função para obter uma marca pelo código
const getMarcaPorCodigoDB = async (codigo) => {
    try {
        const results = await pool.query(`SELECT * FROM marcas WHERE codigo = $1`, [codigo]);

        if (results.rowCount === 0) {
            throw new Error(`Nenhuma marca encontrada com o código ${codigo}`);
        } else {
            const marca = results.rows[0];
            return new Marca(marca.codigo, marca.nome);
        }
    } catch (err) {
        throw new Error("Erro ao recuperar a marca: " + err.message);
    }
};

module.exports = { getMarcasDB, addMarcaDB, updateMarcaDB, deleteMarcaDB, getMarcaPorCodigoDB };
