const request = require('supertest');
const app = require('../../src/app');

describe('ONG Test Suite', () => {
    it('shoud be able to create a new ONG', async () => {
        const ong = {
            name: "Ong de Teste",
            email: "teste@ongteste.com.br",
            whatsapp: "46999739692",
            city: "Francisco Beltrão",
            uf: "PR"
        }

        const response = await request(app)
            .post('/ongs')
            .send(ong);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    })

    it('should return a ONG list', async () => {
        const response = await request(app)
            .get('/ongs');

        expect(response.status).toBe(200);
    })
})