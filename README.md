##E-Shop API - Gestão de Veículos (Marcas e Modelos)
Esta é uma API REST desenvolvida para a disciplina de Programação Web. O sistema permite o gerenciamento de Marcas e seus respectivos Modelos de veículos, contando com um sistema de autenticação via JWT (JSON Web Token) para proteção das rotas.

📝 Descrição do Cenário
O projeto simula o backend de um catálogo automotivo (E-Shop). O domínio foca na relação 1:N entre Marcas e Modelos:

Marcas: Representam os fabricantes (ex: Toyota, Volkswagen).

Modelos: Representam os veículos específicos vinculados a uma marca (ex: Corolla vinculado à Toyota).

Segurança: Apenas usuários autenticados e com tokens válidos podem visualizar, cadastrar ou alterar dados.

🛠️ Tecnologias Utilizadas
Node.js com Express

PostgreSQL (Banco de dados relacional)

JWT (Autenticação)

CORS (Segurança de requisições)

Swagger (Documentação - opcional)

🚀 Instalação e Execução Local
1. Requisitos Prévios
Node.js instalado (v18+)

PostgreSQL instalado e rodando.
