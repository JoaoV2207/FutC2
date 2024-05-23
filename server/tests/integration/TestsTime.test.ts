import { TimeProps } from "../../src/entidades/models/Props";
import app from "../../src/express-config";
import supertest from "supertest";

const time = {
    nome: "Time Teste",
    escudo: "escudo.png",
    abreviacao: "TT",
    cod_time: 123
} as TimeProps;

let timeId = 0;

describe("Testes de integração do Time", () => {
    test("POST /criarTime", async () => {
        const response = await supertest(app)
        .post('/api/time/criarTime').send(time);

        timeId = response.body.id;

        expect(response.statusCode).toEqual(201);
        expect(response.body.nome).toEqual(time.nome);
    });

    test("GET /listarTimes", async () => {
        const response = await supertest(app)
        .get('/api/time/listarTimes');

        expect(response.statusCode).toEqual(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test("DELETE /deletarTime/:id", async () => {
        const response = await supertest(app)
        .delete(`/api/time/deletarTime/${timeId}`);

        expect(response.statusCode).toEqual(200);
    });
});