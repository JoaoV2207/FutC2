import { JogadorProps, TimeProps } from "../../src/entidades/models/Props";
import app from "../../src/express-config";
import supertest from "supertest";

const jogador = {
    nome: "Jogador Teste",
    foto: "foto.png",
    cod_time: 282,
    posicao: "Atacante",
    preco: 10,
    cod_jogador: 123,
    status: "Provável",
} as JogadorProps;

let jogaodorId = 0;

describe("Testes de integração do Jogador", () => {
    test("POST /criarJogador", async () => {
        const response = await supertest(app)
        .post('/api/jogador/criarJogador').send(jogador);

        jogaodorId = response.body.id;

        expect(response.statusCode).toEqual(201);
        expect(response.body.nome).toEqual(jogador.nome);
    });

    test("GET /listarJogadores", async () => {
        const response = await supertest(app)
        .get('/api/jogador/listarJogadores');

        expect(response.statusCode).toEqual(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test("DELETE /deletarJogador/:id", async () => {
        const response = await supertest(app)
        .delete(`/api/jogador/deletarJogador/${jogaodorId}`);

        expect(response.statusCode).toEqual(200);
    });
});