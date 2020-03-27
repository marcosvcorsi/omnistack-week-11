const request = require('supertest');
const app = require('../../src/app');

const connection = require('../../src/database/connection');

const generateUniqueId = require('../../src/utils/generateUniqueId');

describe('Session Test Suite', () => {
    afterAll(async () => {
        await connection.close();
    })

    it('should be able to authenticate with a valid credential', async () => {
        const ong = {
            name: "Ong de Teste",
            email: "teste@ongteste.com.br",
            whatsapp: "46999739692",
            city: "Francisco Beltrão",
            uf: "PR"
        }

        const id = generateUniqueId();

        await connection('ongs').insert({ ...ong, id });

        const response = await request(app)
            .post('/sessions')
            .send({ id });

        expect(response.status).toBe(200);
    })

    it('should be not able to authenticate with invalid credentials', async () => {
        const id = generateUniqueId();

        const response = await request(app)
            .post('/sessions')
            .send({ id });

        expect(response.status).toBe(400);
    })

    it('shoud be return all incidents for profile selected', async () => {
        const ong = {
            name: "Ong de Teste",
            email: "teste@ongteste.com.br",
            whatsapp: "46999739692",
            city: "Francisco Beltrão",
            uf: "PR"
        }

        const id = generateUniqueId();

        await connection('ongs').insert({ ...ong, id });

        const response = await request(app)
            .get('/profile')
            .set('Authorization', id)

        expect(response.status).toBe(200);
    })
})