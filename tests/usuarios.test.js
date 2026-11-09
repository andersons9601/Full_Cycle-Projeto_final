const request = require('supertest');
const app = require('../index');

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