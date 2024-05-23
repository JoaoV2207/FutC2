import ServicoRodada from "../services/ServicoRodada";
import { Router } from "express";

const router = Router();

router.post("/criarRodada", 
async (req, res, next) => {
    try {
        const rodada = await ServicoRodada.criaRodada(req.body);
        res.status(201).json(rodada);
    } catch (error) {
        next(error);
    }
});

export default router;