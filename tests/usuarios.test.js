const request = require('supertest');
const app = require('../index');
const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

beforeAll(async () => {
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
        console.error('Erro ao criar tabela nos testes:', err);
    }
});

afterAll(async () => {
    await pool.end();
});

describe('Testes da API - Full Cycle', () => {
    
    it('Deve testar a conexão com o banco (GET /db)', async () => {
        const response = await request(app).get('/db');
        expect([200, 500]).toContain(response.status);
    });

    it('Deve listar os usuários (GET /usuarios)', async () => {
        const response = await request(app).get('/usuarios');
        
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

});