import ServicoRodadaJogador from "../services/ServicoRodadaJogador";
import { Router } from "express";

const router = Router();

router.post("/criarJogadorRodada", async (req, res, next) => {
    try{
        const jogadorRodada = await ServicoRodadaJogador.criaJogadorRodada(req.body);
        res.status(200).send(jogadorRodada);
    }catch(error){
        next(error);
    }
});

export default router;