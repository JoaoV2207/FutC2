import { sequelize } from "../../database";
import { DataTypes } from "sequelize";
import { Jogador } from "./Jogador";
import { Rodada } from "./Rodada";

export const JogadorRodada = sequelize.define('JogadorRodada', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_jogador: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_rodada: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    pontos: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    jogou: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
},
{
    timestamps: false,
}
);

JogadorRodada.belongsTo(Jogador, {foreignKey: 'id_jogador', targetKey: 'id'});
Jogador.hasMany(JogadorRodada, {foreignKey: 'id_jogador', sourceKey: 'id'});
JogadorRodada.belongsTo(Rodada, {foreignKey: 'id_rodada', targetKey: 'id'});
Rodada.hasMany(JogadorRodada, {foreignKey: 'id_rodada', sourceKey: 'id'});

JogadorRodada.sync({alter: false, force: false})
    // .then(() => {
    //     console.log("Tabela de JogadoresRodadas criada")
    // })
    .catch((error) => {
        console.log("Erro ao criar tabela de JogadoresRodadas: " + error)
});