# E-Shop API - Gestão de Veículos (Marcas e Modelos)
Esta é uma API REST desenvolvida para a disciplina de Programação Web. O sistema permite o gerenciamento de Marcas e seus respectivos Modelos de veículos, contando com um sistema de autenticação via JWT (JSON Web Token) para proteção das rotas.

## Descrição do Cenário
O projeto simula o backend de um catálogo automotivo (E-Shop). O domínio foca na relação 1:N entre Marcas e Modelos:

Marcas: Representam os fabricantes (ex: Toyota, Volkswagen).

Modelos: Representam os veículos específicos vinculados a uma marca (ex: Corolla vinculado à Toyota).

Segurança: Apenas usuários autenticados e com tokens válidos podem visualizar, cadastrar ou alterar dados.

## Tecnologias Utilizadas
Node.js com Express

PostgreSQL (Banco de dados relacional)

JWT (Autenticação)

CORS (Segurança de requisições)

Swagger (Documentação - opcional)

### Instalação e Execução Local
1. Requisitos Prévios
Node.js instalado (v18+)

Usar o comando para instalar o swagger.

npm install swagger-jsdoc swagger-ui-express

2. Configuração do Banco de Dados
No seu terminal PostgreSQL ou pgAdmin, execute os seguintes comandos para criar a estrutura:

CREATE DATABASE eshoppw;

CREATE TABLE marcas (
    codigo SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL
);

CREATE TABLE modelos (
    codigo SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    marca_id INT NOT NULL,
    FOREIGN KEY (marca_id) REFERENCES marcas(codigo)
);

CREATE TABLE usuarios (
    email VARCHAR(50) PRIMARY KEY,
    senha VARCHAR(20) NOT NULL,
    tipo CHAR(1) NOT NULL, -- 'A' Admin, 'U' Usuário
    telefone VARCHAR(20),
    nome VARCHAR(50) NOT NULL
);

-- Inserir usuário de teste

INSERT INTO usuarios (email, senha, tipo, telefone, nome) 
VALUES ('jorgebavaresco@ifsul.edu.br', '123456', 'A', '(54)99984-4348', 'Jorge Bavaresco');
