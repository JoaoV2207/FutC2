import { mapWhereFieldNames } from "sequelize/types/utils";
import { Jogador } from "../models/Jogador";
import { JogadorProps } from "../models/Props";
import ServicoTime from "./ServicoTime";
import { Time } from "../models/Time";
import { JogadorRodada } from "../models/JogadorRodada";
import { Op } from "sequelize";

class ServicoJogador {
    async criaJogador(body: JogadorProps){

        const time = await ServicoTime.buscaTimePorCod(body.cod_time!);

        const id_time = time.getDataValue("id");

        const jogador = {
            nome: body.nome,
            foto: body.foto,
            id_time: id_time,
            posicao: body.posicao,
            preco: body.preco,
            cod_jogador: body.cod_jogador,
            status: body.status,
        };

        const novoJogador = await Jogador.create(jogador);
        return novoJogador;
    }

    async buscaJogadorPorCod(cod_jogador: number){
        const jogador = await Jogador.findOne({where: {cod_jogador: cod_jogador}});
        if(jogador) return jogador;
        else throw new Error("Jogador não encontrado");
    }

    async buscaJogadorPorId(id: number){
        const jogador = await Jogador.findByPk(id);
        if(jogador) return jogador;
        else throw new Error("Jogador não encontrado");
    }

    async listaJogadorDinamico(body: JogadorProps){

        let filtroDinamico: any = {};
        if(body.nome) filtroDinamico.nome = body.nome;
        if(body.posicao) filtroDinamico.posicao = body.posicao;
        if(body.status) filtroDinamico.status = body.status;

        if(body.nome_time) {
            const time = await ServicoTime.buscaTimePorNome(body.nome_time);
            filtroDinamico.id_time = time.getDataValue("id");
        }
        if(body.cod_time) {
            const time = await ServicoTime.buscaTimePorCod(body.cod_time);
            filtroDinamico.id_time = time.getDataValue("id");
        }
        // if(body.preco) {
        //     filtroDinamico.preco = {[Op.gte]: body.preco};
        // }

        const jogadores = await Jogador.findAll(
        {
            where: filtroDinamico,
            include: [ 
                {
                    model: Time,
                    attributes: ["nome", "escudo", "abreviacao"],
                }
            ]
        });
        return jogadores;
    }

    async retornaListaDeJogadores(lista_ids: string) {
        console.log(lista_ids);
        const ids = lista_ids.split(',',12);
        if(ids.length<12) ids.pop();
        console.log(ids);
        const jogadores: any = [];
        for(let i=0; i<ids.length; i++){
            const jogador = await this.buscaJogadorPorId(parseInt(ids[i]));
            jogadores.push(jogador);
        }
        return jogadores;
    }

    async listarJogadores(){
        const jogadores = await Jogador.findAll({
            include: [ 
                {
                    model: Time,
                    attributes: ["nome", "escudo", "abreviacao"],
                }
            ]
        });
        return jogadores;
    }

    async deletarJogador(id: number){
        const jogador = await this.buscaJogadorPorId(id);
        await jogador.destroy();
    }

}

export default new ServicoJogador();