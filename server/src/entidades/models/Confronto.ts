import { sequelize } from "../../database";
import { DataTypes } from "sequelize";
import { Rodada } from "./Rodada";

export const Confronto = sequelize.define('Confronto', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_rodada: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_time_mandante: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_time_visitante: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    data: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    placar: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},
{
    timestamps: false,
}
);

Confronto.belongsTo(Rodada, {foreignKey: 'id_rodada', targetKey: 'id'});
Rodada.hasMany(Confronto, {foreignKey: 'id_rodada', sourceKey: 'id'});

Confronto.sync({alter: false, force: false})
    // .then(() => {
    //     console.log("Tabela de Confrontos criada")
    // })
    .catch((error) => {
        console.log("Erro ao criar tabela de Confrontos: " + error)
});