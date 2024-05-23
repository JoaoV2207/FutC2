import { sequelize } from '../../database';
import { DataTypes } from 'sequelize';
import { Usuario } from './Usuario';
import { Jogador } from './Jogador';

export const TimeUsuarioRodada = sequelize.define('TimeUsuarioRodada', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_rodada: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    preco: {
        type: DataTypes.REAL,
        allowNull: false,
        defaultValue: 0,
    },
    pontos: {
        type: DataTypes.REAL,
        allowNull: false,
        defaultValue: 0,
    },
    jogadores: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '',
    },
    qtd_jogadores: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
},
{
    timestamps: true,
}
);

TimeUsuarioRodada.belongsTo(Usuario, {foreignKey: 'id_usuario', targetKey: 'id'});
Usuario.hasMany(TimeUsuarioRodada, {foreignKey: 'id_usuario', sourceKey: 'id'});

TimeUsuarioRodada.sync({alter: false, force: false})
    // .then(() => {
    //     console.log("Tabela de TimeUsuarioRodada criada")
    // })
    .catch((error) => {
        console.log("Erro ao criar tabela de TimeUsuarioRodada: " + error)
});
