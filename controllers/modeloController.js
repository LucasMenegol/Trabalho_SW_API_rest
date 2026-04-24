const { getModelosDB, addModeloDB, updateModeloDB, deleteModeloDB, getModeloPorCodigoDB } = require('../usecases/modeloUseCases');

const getModelos = async (req, res) => {
    try {
        const modelos = await getModelosDB();
        res.status(200).json(modelos);
    } catch (err) {
        res.status(400).json({ status: "error", message: err });
    }
};

const addModelo = async (req, res) => {
    try {
        const modelo = await addModeloDB(req.body);
        res.status(200).json({ status: "success", objeto: modelo });
    } catch (err) {
        res.status(400).json({ status: "error", message: err });
    }
};

const updateModelo = async (req, res) => {
    try {
        const modelo = await updateModeloDB(req.body);
        res.status(200).json({ status: "success", objeto: modelo });
    } catch (err) {
        res.status(400).json({ status: "error", message: err });
    }
};

const deleteModelo = async (req, res) => {
    try {
        const mensagem = await deleteModeloDB(parseInt(req.params.codigo));
        res.status(200).json({ status: "success", message: mensagem });
    } catch (err) {
        res.status(400).json({ status: "error", message: err });
    }
};

// Função para pegar um modelo pelo código
const getModeloPorCodigo = async (req, res) => {
    try {
        const modelo = await getModeloPorCodigoDB(parseInt(req.params.codigo)); // Recupera o código da URL
        if (!modelo) {
            return res.status(404).json({ status: "error", message: "Modelo não encontrado" });
        }
        res.status(200).json(modelo);
    } catch (err) {
        res.status(400).json({ status: "error", message: "Erro ao recuperar o modelo: " + err });
    }
};

module.exports = { getModelos, addModelo, updateModelo, deleteModelo, getModeloPorCodigo };
