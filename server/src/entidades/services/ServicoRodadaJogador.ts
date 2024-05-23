import { JogadorRodadaProps } from "../models/Props";
import { JogadorRodada } from "../models/JogadorRodada";
import ServicoJogador from "./ServicoJogador";
import ServicoRodada from "./ServicoRodada";

class ServicoJogadorRodada {
    async criaJogadorRodada(body: JogadorRodadaProps){

        const jogador = await ServicoJogador.buscaJogadorPorCod(body.cod_jogador);
        const rodada = await ServicoRodada.buscaRodadaPorNumero(body.rodada);

        const jogadorRodada = {
            id_jogador: jogador.getDataValue("id"),
            id_rodada: rodada.getDataValue("id"),
            pontos: body.pontos,
            jogou: body.jogou,
        };

        const novoJogadorRodada = await JogadorRodada.create(jogadorRodada);
        return novoJogadorRodada;
    }

}

export default new ServicoJogadorRodada();