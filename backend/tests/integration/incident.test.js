const request = require('supertest');
const app = require('../../src/app');

const connection = require('../../src/database/connection');

const generateUniqueId = require('../../src/utils/generateUniqueId');

describe('Incident Test Suite', () => {
    afterAll(async () => {
        await connection.close();
    })

    it('shoud be able to create a new incident', async () => {
        const ong = {
            name: "Ong de Teste",
            email: "teste@ongteste.com.br",
            whatsapp: "46999739692",
            city: "Francisco Beltrão",
            uf: "PR"
        }

        const id = generateUniqueId();

        await connection('ongs').insert({ ...ong, id });

        const incident = {
            title: "Teste Caso",
            description: "Precisamos de ajuda com este caso",
            value: 125.0
        }

        const response = await request(app)
            .post('/incidents')
            .set('Authorization', id)
            .send(incident);

        expect(response.status).toBe(201);
    })

    it('should return a incident list with pagination', async () => {
        const response = await request(app)
            .get('/incidents')

        expect(response.status).toBe(200);
        expect(response.body.length).toBeLessThanOrEqual(5);
    })

    it('shoud delete an incident', async () => {
        const ong = {
            name: "Ong de Teste",
            email: "teste@ongteste.com.br",
            whatsapp: "46999739692",
            city: "Francisco Beltrão",
            uf: "PR"
        }

        const ongId = generateUniqueId();

        await connection('ongs').insert({ ...ong, id: ongId });

        const incident = {
            title: "Teste Caso",
            description: "Precisamos de ajuda com este caso",
            value: 125.0,
            ong_id: ongId,
        }

        const [id] = await connection('incidents').insert(incident);

        const response = await request(app)
            .delete(`/incidents/${id}`)
            .set('Authorization', ongId);

        expect(response.status).toBe(204);
    })
})