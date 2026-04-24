const { getMarcasDB, addMarcaDB, updateMarcaDB, deleteMarcaDB, getMarcaPorCodigoDB} = require('../usecases/marcaUseCases');

const getMarcas = async (req, res) => {
    try {
        const marcas = await getMarcasDB();
        res.status(200).json(marcas);
    } catch (err) {
        res.status(400).json({ status: "error", message: err });
    }
};

const addMarca = async (req, res) => {
    try {
        const marca = await addMarcaDB(req.body);
        res.status(200).json({ status: "success", objeto: marca });
    } catch (err) {
        res.status(400).json({ status: "error", message: err });
    }
};

const updateMarca = async (req, res) => {
    try {
        const marca = await updateMarcaDB(req.body);
        res.status(200).json({ status: "success", objeto: marca });
    } catch (err) {
        res.status(400).json({ status: "error", message: err });
    }
};

const deleteMarca = async (req, res) => {
    try {
        const mensagem = await deleteMarcaDB(parseInt(req.params.codigo));
        res.status(200).json({ status: "success", message: mensagem });
    } catch (err) {
        res.status(400).json({ status: "error", message: err });
    }
};

// Função para pegar uma marca pelo código
const getMarcaPorCodigo = async (req, res) => {
    try {
        const marca = await getMarcaPorCodigoDB(parseInt(req.params.codigo)); // Recupera o código da URL
        if (!marca) {
            return res.status(404).json({ status: "error", message: "Marca não encontrada" });
        }
        res.status(200).json(marca);
    } catch (err) {
        res.status(400).json({ status: "error", message: "Erro ao recuperar a marca: " + err });
    }
};

module.exports = { getMarcas, addMarca, updateMarca, deleteMarca, getMarcaPorCodigo };