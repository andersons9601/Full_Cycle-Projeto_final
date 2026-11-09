const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
app.use(express.json());

// Configuração do pool de conexões
const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

// Criar tabela automaticamente se não existir (essencial para CI e novos ambientes)
const criarTabela = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS usuarios (
                id SERIAL PRIMARY KEY,
                nome VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
    } catch (err) {
        console.error('Erro ao criar tabela automaticamente:', err.message);
    }
};
criarTabela();

app.get('/usuarios', async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM usuarios');
        res.json(resultado.rows);
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: 'Erro no servidor ao buscar usuários' });
    }
});

app.post('/usuarios', async (req, res) => {
    try {
        const { nome, email } = req.body;
        if (!nome || !email) {
            return res.status(400).json({ erro: 'Nome e email são obrigatórios' });
        }
        const resultado = await pool.query(
            'INSERT INTO usuarios (nome, email) VALUES ($1, $2) RETURNING *',
            [nome, email]
        );
        res.status(201).json(resultado.rows[0]);
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: 'Erro ao cadastrar usuário' });
    }
});

app.put('/usuarios/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, email } = req.body;
        if (!nome || !email) {
            return res.status(400).json({ erro: 'Nome e email são obrigatórios' });
        }
        const resultado = await pool.query(
            'UPDATE usuarios SET nome = $1, email = $2 WHERE id = $3 RETURNING *',
            [nome, email, id]
        );
        if (resultado.rows.length === 0) {
            return res.status(404).json({ erro: 'Usuário não encontrado' });
        }
        res.json(resultado.rows[0]);
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: 'Erro ao atualizar usuário' });
    }
});

app.delete('/usuarios/:id', async (req, res) => {
    try {
        const { id } = req.params;  
        const resultado = await pool.query(
            'DELETE FROM usuarios WHERE id = $1 RETURNING *',
            [id]
        );
        if (resultado.rows.length === 0) {
            return res.status(404).json({ erro: 'Usuário não encontrado' });
        }
        res.json({ mensagem: 'Usuário deletado com sucesso!' });
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: 'Erro ao deletar usuário' });
    }
});

// Inicialização condicional (não inicia o servidor HTTP durante os testes Jest)
if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}

module.exports = app;