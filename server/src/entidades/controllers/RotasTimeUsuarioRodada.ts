import ServicoTimeUsuarioRodada from "../services/ServicoTimeUsuarioRodada";
import { Router } from "express";

const router = Router();

router.post("/criaTimeRodada", async (req, res) => {
    try {
        const { id_usuario, id_rodada } = req.body;
        const timeUsuarioRodada = await ServicoTimeUsuarioRodada.criaTimeUsuarioRodada(id_usuario, id_rodada);
        res.status(201).json(timeUsuarioRodada);
    } catch (error) {
        res.status(400).end(error);
    }
});

router.put("/adicionaJogador", async (req, res) => {
    try {
        const id_jogador = req.body.id_jogador;
        const id_time_usuario_rodada = req.body.id_time_usuario_rodada;
        const time = await ServicoTimeUsuarioRodada.adicionaJogador(id_jogador, id_time_usuario_rodada);
        res.status(201).json(time);
    } catch (error: any) {
        res.status(400).end(error.message);
    }
});

router.put("/removeJogador", async (req, res) => {
    try {
        const id_jogador = req.body.id_jogador;
        const id_time_usuario_rodada = req.body.id_time_usuario_rodada;
        const time = await ServicoTimeUsuarioRodada.removeJogador(id_jogador, id_time_usuario_rodada);
        res.status(201).json(time);
    } catch (error: any) {
        res.status(400).end(error.message);
    }
});

router.get("/buscaTimeUsuarioRodada", async (req, res) => {
    try {
        const id_usuario = req.body.id_usuario;
        const id_rodada = req.body.id_rodada;
        const time = await ServicoTimeUsuarioRodada.retornaTimeUsuarioRodada(id_usuario, id_rodada);
        res.status(201).json(time);
    } catch (error: any) {
        res.status(400).end(error.message);
    }
});

router.get("/buscaTimeUsuarioRodadaPorId", async (req, res) => {
    try {
        const id = req.body.id;
        const time = await ServicoTimeUsuarioRodada.buscaTimeUsuarioRodadaPorId(id);
        res.status(201).json(time);
    } catch (error: any) {
        res.status(400).end(error.message);
    }
});

router.put("/resetarTimeUsuarioRodada", async (req, res) => {
    try {
        const id_usuario = req.body.id_usuario;
        const id_rodada = req.body.id_rodada;
        const time = await ServicoTimeUsuarioRodada.resetaTimeUsuarioRodada(id_usuario, id_rodada);
        res.status(201).json(time);
    } catch (error: any) {
        res.status(400).end(error.message);
    }
});

router.get("/listaTimeUsuarioRodadaComJogadores", async (req, res) => {
    try {
        const id_usuario = req.body.id_usuario;
        const id_rodada = req.body.id_rodada;
        const time = await ServicoTimeUsuarioRodada.retornaTimeUsuarioRodadaComJogadores(id_usuario, id_rodada);
        res.status(200).json(time);
    } catch (error: any) {
        res.status(400).end(error.message);
    }
});

export default router;