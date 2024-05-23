import { sequelize } from "../../database";
import { DataTypes } from "sequelize";

export const Rodada = sequelize.define('Rodada', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    numero: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    data_inicio: {
        type: DataTypes.DATE,
        allowNull: false,
    },

    data_fim: {
        type: DataTypes.DATE,
        allowNull: false,
    }

},
{
    timestamps: false,
}
);

Rodada.sync({alter: false, force: false})
    // .then(() => {
    //     console.log("Tabela de Rodadas criada")
    // })
    .catch((error) => {
        console.log("Erro ao criar tabela de Rodadas: " + error)
});
