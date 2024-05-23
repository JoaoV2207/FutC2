import { Rodada } from "../models/Rodada";
import { RodadaProps } from "../models/Props";

class ServicoRodada {
    async criaRodada(body: RodadaProps){

        const rodada = {
            numero: body.numero,
            data_inicio: body.data_inicio,
            data_fim: body.data_fim,
        };
        const novaRodada = await Rodada.create(rodada);
        return novaRodada;
    }
    
    async buscaRodadaPorNumero(numero: number){
        const rodada = await Rodada.findOne({where: {numero: numero}});
        if(rodada) return rodada;
        else throw new Error("Rodada não encontrada");
    }
}

export default new ServicoRodada();