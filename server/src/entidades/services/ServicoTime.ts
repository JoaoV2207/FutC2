import { TimeProps } from "../models/Props";
import { Time } from "../models/Time";

class ServicosTime {
    async criaTime(body: TimeProps) {
        const time = {
            nome: body.nome,
            abreviacao: body.abreviacao,
            escudo: body.escudo,
            cod_time: body.cod_time
        };
        const novoTime = await Time.create(time);
        return novoTime;
    }

    async buscaTimePorId(id: number) {
        const time = await Time.findByPk(id);
        if (time) return time;
        else throw new Error("Time não encontrado");
    }

    async buscaTimePorCod(cod: number) {
        const time = await Time.findOne({ where: { cod_time: cod } });
        if (time) return time;
        else throw new Error("Time não encontrado");
    }

    async buscaTimePorNome(nome: string) {
        const time = await Time.findOne({ where: { nome: nome } });
        if (time) return time;
        else throw new Error("Time não encontrado");
    }

    async listaTimes() {
        const times = await Time.findAll();
        return times;
    }

    async deletarTime(id: number) {
        const time = await this.buscaTimePorId(id);
        await time.destroy();
    }
}

export default new ServicosTime();