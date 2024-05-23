import { sequelize } from "../../database";
import { DataTypes } from "sequelize";
import { UsuarioProps } from "./Props";

export const Usuario = sequelize.define<UsuarioProps>('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            name: 'email',
            msg: 'Email já cadastrado'
        }
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    saldo: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
    },
    nome_time: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},
{
    timestamps: false,
}
);

Usuario.sync({alter: false, force: false})
    // .then(() => {
    //     console.log("Tabela de Usuários criada")
    // })
    .catch((error) => {
        console.log("Erro ao criar tabela de Usuários: " + error)
});
