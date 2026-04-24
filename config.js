const { Pool } = require('pg');

// Verifica se está no ambiente de produção
const isProduction = process.env.NODE_ENV === 'production';

// Variável para o pool de conexões
let pool = null;

// Se estiver em produção, utiliza a string de conexão do banco de dados na variável de ambiente DATABASE_URL
if (isProduction) {
    pool = new Pool({
        connectionString: process.env.DATABASE_URL,  // Conexão para o banco na nuvem
        ssl: {
            rejectUnauthorized: false,  // Necessário para alguns provedores em nuvem como o Heroku
        },
    });
} else {
    // Se estiver em desenvolvimento, usa a configuração local
    pool = new Pool({
        user: 'postgres',      // Usuário do banco local
        password: 'postgres',  // Senha do banco local
        database: 'eshoppw',   // Nome do banco de dados local
        host: 'localhost',     // O banco está rodando localmente
        port: 5432,            // A porta padrão do PostgreSQL
    });
}

// Exporta o pool de conexões para ser usado em outros arquivos
module.exports = { pool };
