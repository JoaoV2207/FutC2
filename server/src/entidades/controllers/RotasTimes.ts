import ServicosTime from "../services/ServicoTime";
import { Router } from "express";

const router = Router();

router.post("/criarTime",
    async (req, res, next) => {
        try {
            const time = await ServicosTime.criaTime(req.body);
            res.status(201).json(time);
        } catch (error) {
            next(error);
        }
    }
);

router.get("/listarTimes",
    async (req, res, next) => {
        try {
            const times = await ServicosTime.listaTimes();
            res.status(200).json(times);
        } catch (error) {
            next(error);
        }
    }
);

router.delete("/deletarTime/:id",
    async (req, res, next) => {
        try {
            const id = parseInt(req.params.id);
            const time = await ServicosTime.deletarTime(id);
            res.status(200).json(time);
        } catch (error) {
            next(error);
        }
    }
);

export default router;
