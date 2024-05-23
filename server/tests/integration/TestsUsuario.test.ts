import { Usuario } from "../../src/entidades/models/Usuario";
import { UsuarioProps } from "../../src/entidades/models/Props";
import app from "../../src/express-config";
import supertest from "supertest";

const usuario = {
    nome: "Usuario Teste",
    email: "email@teste.com",
    senha: "123456",
    nome_time: "Teste"
} as UsuarioProps;

let usuarioId = 0;

describe("Testes de integração do Usuario", () => {
    test("POST /criaUsuario", async () => {
        const response = await supertest(app)
        .post('/api/usuario/criarUsuario').send(usuario);

        usuarioId = response.body.id;

        expect(response.statusCode).toEqual(201);
        expect(response.body.nome).toEqual(usuario.nome);
    });

    test("GET /retornaUsuarioPorId", async () => {
        const response = await supertest(app)
        .get(`/api/usuario/retornaUsuarioPorId/${usuarioId}`).send();
 
        expect(response.statusCode).toEqual(200);
        expect(response.body.nome).toEqual(usuario.nome);
    });

    test("GET /retornaTodosUsuarios", async () => {
        const response = await supertest(app)
        .get('/api/usuario/retornaTodosUsuarios').send();
 
        expect(response.statusCode).toEqual(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test("GET /retornaUsuarioPorNome", async () => {
        const response = await supertest(app)
        .get(`/api/usuario/retornaUsuarioPorNome/${usuario.nome}`).send();
 
        expect(response.statusCode).toEqual(200);
        expect(response.body.nome).toEqual(usuario.nome);
    });

    test("GET /retornaUsuarioPorEmail", async () => {
        const response = await supertest(app)
        .get(`/api/usuario/retornaUsuarioPorEmail/${usuario.email}`).send();
 
        expect(response.statusCode).toEqual(200);
        expect(response.body.nome).toEqual(usuario.nome);
    });

    test("DELETE /deletarUsuario", async () => {
        const response = await supertest(app)
        .delete(`/api/usuario/deletarUsuario/${usuarioId}`).send();
 
        expect(response.statusCode).toEqual(200);
    });

    test("GET /retornaUsuarioPorId - Nao Encontrado", async () => {
        const response = await supertest(app)
        .get(`/api/usuario/retornaUsuarioPorId/${usuarioId}`).send();
 
        expect(response.statusCode).toEqual(500);
    });
});