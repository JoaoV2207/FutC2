import { CreationOptional, InferAttributes, InferCreationAttributes, Model } from "sequelize";

export interface UsuarioProps extends Model<InferAttributes<UsuarioProps>, InferCreationAttributes<UsuarioProps>> {
    id: CreationOptional<string>;
    nome: string;
    email: string;
    senha: string;
    saldo?: number;
    nome_time?: string;
}

export interface TimeProps {
    id?: number;
    nome: string;
    escudo: string;
    abreviacao: string;
    cod_time: number;
}

export interface JogadorProps {
    id?: number;
    nome: string;
    foto?: string;
    cod_time?: number;
    id_time?: number;
    nome_time?: string;
    posicao: string;
    status: string;
    media?: number;
    cod_jogador: number;
    preco?: number;
}

export interface JogadorRodadaProps {
    id?: number;
    cod_jogador: number;
    rodada: number;
    pontos: number;
    jogou: boolean;
}

export interface ConfrontoProps {
    id?: number;
    rodada: number;
    id_time_mandante: number;
    id_time_visitante: number;
    data: Date;
    placar: string;
}

export interface TimeUsuarioRodadaProps {
    id?: number;
    id_usuario: number;
    rodada: number;
    preco: number;
    pontos: number;
    jogadores: JogadorProps[];
}

export interface RodadaProps {
    id?: number;
    numero: number;
    data_inicio: Date;
    data_fim: Date;
}