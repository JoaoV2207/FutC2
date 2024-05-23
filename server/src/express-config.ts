import express, { Express } from 'express';
import cors, { CorsOptions } from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
 
dotenv.config();

const app: Express = express();

const options: CorsOptions = {
  origin: 'http://localhost:3023',
  credentials: true
};
app.use(cors(options));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
  }));

import rotasUsuario from './entidades/controllers/RotasUsuario';
app.use('/api/usuario',rotasUsuario);
import rotasTime from './entidades/controllers/RotasTimes';
app.use('/api/time',rotasTime);
import rotasJogador from './entidades/controllers/RotasJogador';
app.use('/api/jogador',rotasJogador);
import rotasRodada from './entidades/controllers/RotasRodada';
app.use('/api/rodada',rotasRodada);
import rotasJogadorRodada from './entidades/controllers/RotasJogadorRodada';
app.use('/api/jogadorrodada',rotasJogadorRodada);
import rotasTimeUsuarioRodada from './entidades/controllers/RotasTimeUsuarioRodada';
app.use('/api/timeusuariorodada',rotasTimeUsuarioRodada);

export default app;