import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { Usuario } from '../entidades/models/Usuario';
import { UsuarioProps } from '../entidades/models/Props';
import { Request, Response, NextFunction } from 'express';
import { RequestWithUser } from '../entidades/controllers/RotasUsuario';

function getEnv(name: string): string {
  const value = process.env[name];
  
  if (!value) {
    throw new Error(`Faltando: process.env['${name}'].`);
  }
  
  return value;
}

function generateJWT(user: UsuarioProps, res: Response) {
  const body = {
    id: user.id,
    nome: user.nome,
    email: user.email,
  };
  
  const token = sign({ user: body },'mysecretkey', { expiresIn: '30d'});
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: 'development' !== 'development',
  });
}

function cookieExtractor(req: Request) {
  let token = null;

  if (req && req.cookies) {
    token = req.cookies['jwt'];
  }

  return token;
}

export async function loginMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await Usuario.findOne({where: {email: req.body.email}});
    if (!user) {
      throw new Error('E-mail e/ou senha incorretos!');
    }

    console.log(user.getDataValue("senha"));

    const matchingPassword = req.body.senha == user.getDataValue("senha");
    if (!matchingPassword) {
      throw new Error('E-mail e/ou senha incorretos!');
    }

    generateJWT(user, res);

    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

export function notLoggedIn(req: Request, res: Response, next: NextFunction) {
  try {
    const token = cookieExtractor(req);

    if (token) {
      const decoded = verify(token,'mysecretkey');
      if (decoded) {
        throw new Error('Você já está logado no sistema!');
      }
    }
    next();
  } catch (error) {
    next(error);
  }
}

export function verifyJWT(req: RequestWithUser, res: Response, next: NextFunction) {
  try {
    const token = cookieExtractor(req);
    if (token) {
      const decoded = verify(token,'mysecretkey') as JwtPayload;
      req.user = decoded.user;
    }

    if (!req.user) {
      throw new Error(
        'Você precisa estar logado para realizar essa ação!');
    }

    next();
  } catch (error) {
    next(error);
  }
}