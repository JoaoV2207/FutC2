import ServicoJogador from "../services/ServicoJogador";
import { Router } from "express";

const router = Router();

router.post("/criarJogador",
    async (req, res, next) => {
        try {
            const jogador = await ServicoJogador.criaJogador(req.body);
            res.status(201).json(jogador);
        } catch (error) {
            next(error);
        }
    }
);

router.get("/buscaJogadorDinamico/",
    async (req, res, next) => {
        try {
            const jogadores = await ServicoJogador.listaJogadorDinamico(req.body);
            res.status(200).json(jogadores);
        } catch (error) {
            next(error);
        }
    }
);

router.get("/listarJogadores",
    async (req, res, next) => {
        try {
            const jogador = await ServicoJogador.listarJogadores();
            res.status(200).json(jogador);
        } catch (error) {
            next(error);
        }
    }
);

router.delete("/deletarJogador/:id",
    async (req, res, next) => {
        try {
            const id = parseInt(req.params.id);
            const jogador = await ServicoJogador.deletarJogador(id);
            res.status(200).json(jogador);
        } catch (error) {
            next(error);
        }
    }
);

export default router;