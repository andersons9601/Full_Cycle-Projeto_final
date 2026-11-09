# Projeto B - API de Domínio Único (Usuários) com Node.js, PostgreSQL e Docker

Projeto desenvolvido para o módulo final do curso Full Cycle (Geração Tech), aplicando boas práticas de Engenharia de Software, conteinerização, persistência relacional, testes automatizados e documentação viva.

---

## Nível e Objetivo
- **Nível:** Projeto B (Monólito modular de domínio único com persistência, Docker, CI verde, testes e documentação de arquitetura/desempenho).
- **Objetivo:** Fornecer uma API REST funcional de gerenciamento de usuários com fluxo ponta a ponta garantido.

---

## Arquitetura e Decisões
- **Stack:** Node.js, Express, PostgreSQL (v15), Docker & Docker Compose.
- **Padrão Utilizado:** Repository / Service Pattern para isolar as regras de acesso a dados e manter o princípio de responsabilidade única (SOLID).
- **Documentação & Decisões:** 
  - [ADR 0001](./docs/adr/0001-decisao.md)
  - [Especificação OpenAPI](./docs/openapi.yaml)
  - [Relatório de Desempenho e SLO](./docs/desempenho.md)

---

## Como Subir o Projeto (Execução)

Para rodar o projeto na sua máquina, você precisa ter instalado o **Git** e o **Docker Desktop**.

### 1. Clonar o repositório
```bash
git clone https://github.com/andersons9601/Full_Cycle-Projeto_final.git
cd Full_Cycle-Projeto_final
```

2. Configurar as Variáveis de Ambiente
Crie um arquivo .env na raiz do projeto baseado no [.env.example](C:/Users/ander/Downloads/Anderson/GeracaoTech/Full_Cycle- Projeto_final/.env.example):

DB_HOST=db
DB_USER=postgres
DB_PASSWORD=senha_segura
DB_NAME=meu_banco
DB_PORT=5432

3. Subir os Containers com Docker
Execute o comando abaixo para construir e iniciar a API e o banco de dados em segundo plano:

docker-compose up --build -d

4. Criar a Tabela no Banco de Dados
Com os containers rodando, execute o comando SQL no seu cliente PostgreSQL (conectando em localhost:5432, usuário postgres, senha senha_segura, banco meu_banco):

CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

Como Testar
1. **Testes Automatizados (Integração e Unidade com Cobertura):**
Para rodar a suíte de testes com Jest e verificar o relatório de cobertura (mínimo declarado de **50%**):
```bash
npm test

2. Endpoints Disponíveis
Acesse via navegador ou cliente HTTP (Postman, Thunder Client, cURL):

GET / → Mensagem de boas-vindas da API.
GET /db → Testa a conexão com o PostgreSQL e retorna o horário do banco.
GET /usuarios → Lista todos os usuários cadastrados.
POST /usuarios → Cadastra um novo usuário (envie JSON no body com nome e email).
PUT /usuarios/:id → Atualiza um usuário existente.
DELETE /usuarios/:id → Remove um usuário pelo ID.
Observabilidade e Desempenho
SLO: 95% das requisições em GET /usuarios respondidas em menos de 200ms (p95 < 200ms).
Detalhes completos em docs/desempenho.md.
Autor
Desenvolvido por José Anderson da Silva para o curso Full Cycle / Engenharia de Software