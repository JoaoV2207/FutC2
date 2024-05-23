import { NextFunction, Request, Router } from "express";
import ServicosUsuario from "../services/ServicosUsuario";
import {loginMiddleware,verifyJWT} from "../../middlewares/login";
import { UsuarioProps } from "../models/Props";

export interface RequestWithUser extends Request {
    user?: UsuarioProps;
}

const router = Router();

router.post("/login",
    loginMiddleware,
);

router.post('/logout',
    async (req, res, next) => {
    try {
    console.log("logout")
        res.clearCookie('jwt');
        res.status(204).end();
    } catch (error) {
        next(error);
    }
    },
);

router.post(('/criarUsuario'),
    async (req, res, next) => {
        try {
            const usuario = await ServicosUsuario.criaUsuario(req.body);
            res.status(201).json(usuario);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
);

router.put(('/editarUsuario/:id'),
    async (req, res, next) => {
        try {
            const id = parseInt(req.params.id);
            const usuario = await ServicosUsuario.editaUsuario(id, req.body);
            res.status(200).json(usuario);
        } catch (error) {
            next(error);
        }
    }
);

router.delete(('/deletarUsuario/:id'),
    async (req, res, next) => {
        try {
            const id = parseInt(req.params.id);
            await ServicosUsuario.deletaUsuario(id);
            res.status(200).end();
        } catch (error) {
            next(error);
        }
    }
);

router.get(('/retornaUsuarioPorId/:id'),
    async (req, res, next) => {
        try {
            const id = parseInt(req.params.id);
            const usuario = await ServicosUsuario.retornaUsuarioPorId(id);
            res.status(200).json(usuario);
        } catch (error) {
            next(error);
        }
    }
);

router.get(('/retornaTodosUsuarios'),
    async (req, res, next) => {
        try {
            const usuarios = await ServicosUsuario.retornaTodosUsuarios();
            res.status(200).json(usuarios);
        } catch (error) {
            next(error);
        }
    }
);

router.get(('/retornaUsuarioPorEmail/:email'),
    async (req, res, next) => {
        try {
            const email = req.params.email;
            const usuario = await ServicosUsuario.retornaUsuarioPorEmail(email);
            res.status(200).json(usuario);
        } catch (error) {
            next(error);
        }
    }
);

router.get(('/retornaUsuarioPorNome/:nome'),
    async (req, res, next) => {
        try {
            const nome = req.params.nome;
            const usuario = await ServicosUsuario.retornaUsuarioPorNome(nome);
            res.status(200).json(usuario);
        } catch (error) {
            next(error);
        }
    }
);

router.get('/me', 
    verifyJWT, 
    async (req: RequestWithUser, res, next: NextFunction) => {
        try {
            res.status(200).json(req.user);
        } catch (error) {
            next(error);
        }
    }
);

export default router;