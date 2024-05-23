import { sequelize } from "../../database";
import { TimeUsuarioRodada } from "../models/TimeUsuarioRodada";
import ServicoJogador from "./ServicoJogador";
import ServicosUsuario from "./ServicosUsuario";
class ServicoTimeUsuarioRodada {
    async criaTimeUsuarioRodada(id_usuario: number, id_rodada: number) {
        const timeUsuarioRodada = {
            id_usuario: id_usuario,
            id_rodada: id_rodada,
            preco: 0,
            pontos: 0,
            jogadores: ''
        };
        const novoTimeUsuarioRodada = await TimeUsuarioRodada.create(timeUsuarioRodada);
        return novoTimeUsuarioRodada;
    }
    async buscaTimeUsuarioRodadaPorId(id: number) {
        const timeUsuarioRodada = await TimeUsuarioRodada.findByPk(id);
        if (timeUsuarioRodada) return timeUsuarioRodada;
        else throw new Error("TimeUsuarioRodada não encontrado");
    }
    async adicionaJogador(id_jogador: number, id_time_usuario_rodada: number) {
        const timeUsuarioRodada = await this.buscaTimeUsuarioRodadaPorId(id_time_usuario_rodada);
        let qtd_jogadores = timeUsuarioRodada.getDataValue("qtd_jogadores");
        
        if (qtd_jogadores === 12) throw new Error("Time completo");
        
        let jogadores = timeUsuarioRodada.getDataValue("jogadores");
        const preco_time = timeUsuarioRodada.getDataValue("preco");
        const usuario = await ServicosUsuario.retornaUsuarioPorId(timeUsuarioRodada.getDataValue("id_usuario"));
        const saldo = usuario.getDataValue("saldo");
        const jogador = await ServicoJogador.buscaJogadorPorId(id_jogador);
        const preco_jogador = jogador.getDataValue("preco");
        if(qtd_jogadores > 0) {
            let jogadores_array = jogadores.split(",");
            jogadores_array.pop();

            let goleiroTime = 1;
            let zagueirosTime = 2;
            let lateraisTime = 2;
            let meiasTime = 3;
            let atacantesTime = 3;
            let tecnicoTime = 1;
            for(let i = 0; i < jogadores_array.length; i++) {
                const verificaErroTime = await ServicoJogador.buscaJogadorPorId(parseInt(jogadores_array[i]));
                console.log(verificaErroTime.getDataValue("posicao"));
                if(verificaErroTime.getDataValue("id") == id_jogador) throw new Error("Jogador já adicionado");
                else {
                    if(verificaErroTime.getDataValue("posicao") == "Goleiro" && jogador.getDataValue("posicao") == "Goleiro") {
                        goleiroTime -= 1;
                        if(goleiroTime == 0) throw new Error("Já existe um goleiro no time");
                    } 
                    else if (verificaErroTime.getDataValue("posicao") == "Zagueiro" && jogador.getDataValue("posicao") == "Zagueiro") {
                        zagueirosTime -= 1;
                        if(zagueirosTime == 0) throw new Error("Já existe dois zagueiros no time");
                    }
                    else if (verificaErroTime.getDataValue("posicao") == "Lateral" && jogador.getDataValue("posicao") == "Lateral") {
                        lateraisTime -= 1;
                        if(lateraisTime == 0) throw new Error("Já existe dois laterais no time");
                    }
                    else if (verificaErroTime.getDataValue("posicao") == "Meia" && jogador.getDataValue("posicao") == "Meia") {
                        meiasTime -= 1;
                        if(meiasTime == 0) throw new Error("Já existe três meias no time");
                    }
                    else if (verificaErroTime.getDataValue("posicao") == "Atacante" && jogador.getDataValue("posicao") == "Atacante") {
                        atacantesTime -= 1;
                        if(atacantesTime == 0) throw new Error("Já existe três atacantes no time");
                    }
                    else if (verificaErroTime.getDataValue("posicao") == "Tecnico" && jogador.getDataValue("posicao") == "Tecnico") {
                        tecnicoTime -= 1;
                        if(tecnicoTime < 0) throw new Error("Já existe um tecnico no time");
                    }
                }
            }
        }
        jogadores += jogador.getDataValue("id") + ",";
        qtd_jogadores += 1;
        if (preco_time + preco_jogador > saldo!) throw new Error("Saldo insuficiente");
        const novotime = await timeUsuarioRodada.update({ jogadores:  jogadores, preco: preco_time + preco_jogador, qtd_jogadores: qtd_jogadores });
        return novotime;
    }
    async removeJogador(id_jogador: number, id_time_usuario_rodada: number) {
        const timeUsuarioRodada = await this.buscaTimeUsuarioRodadaPorId(id_time_usuario_rodada);
        let qtd_jogadores = timeUsuarioRodada.getDataValue("qtd_jogadores");
        if (qtd_jogadores === 0) throw new Error("Time vazio");
        
        let jogadores = timeUsuarioRodada.getDataValue("jogadores");
        const preco_time = timeUsuarioRodada.getDataValue("preco");
        const jogador = await ServicoJogador.buscaJogadorPorId(id_jogador);
        const preco_jogador = jogador.getDataValue("preco");
        jogadores = jogadores.replace(jogador.getDataValue("id") + ",", "");
        qtd_jogadores -= 1;
        const novotime = await timeUsuarioRodada.update({ jogadores:  jogadores, preco: preco_time - preco_jogador, qtd_jogadores: qtd_jogadores });
        return novotime;
    }
    async retornaTimeUsuarioRodada(id_usuario: number, id_rodada: number) {
        const timeUsuarioRodada = await TimeUsuarioRodada.findOne({ where: { id_usuario: id_usuario, id_rodada: id_rodada } });
        if (timeUsuarioRodada) return timeUsuarioRodada;
        else throw new Error("TimeUsuarioRodada não encontrado");
    }
    async resetaTimeUsuarioRodada(id_usuario: number, id_rodada: number) {
        const timeUsuarioRodada = await this.retornaTimeUsuarioRodada(id_usuario, id_rodada);
        const novotime = await timeUsuarioRodada.update({ jogadores: '', preco: 0, qtd_jogadores: 0 });
        return novotime;
    }
    async retornaTimeUsuarioRodadaComJogadores(id_usuario: number, id_rodada: number) {
        const time = await this.retornaTimeUsuarioRodada(id_usuario, id_rodada);
        const jogadores = await ServicoJogador.retornaListaDeJogadores(time.getDataValue("jogadores"));
        return { time: time, jogadores: jogadores };
    }
}
export default new ServicoTimeUsuarioRodada();