const express = require('express');
const cors = require('cors');
const rotas = require('./routes/rotas');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();

// Configurações do Swagger
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API eShoppw - Marcas e Modelos',
            version: '1.0.0',
            description: 'Documentação da API para gerenciamento de veículos com autenticação JWT',
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'apiKey',
                    name: 'authorization',
                    in: 'header',
                    description: 'Insira o token JWT retornado pelo login'
                }
            }
        },
        servers: [
            {
                url: 'http://localhost:3002',
                description: 'Servidor Local'
            }
        ]
    },
    // Caminho para os arquivos que contém as anotações
    apis: ['./routes/*.js'] 
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(rotas);

app.listen(process.env.PORT || 3002, () => {
    console.log('Servidor rodando em http://localhost:3002');
    console.log('Documentação disponível em http://localhost:3002/api-docs');
});
