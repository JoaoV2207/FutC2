import { Usuario } from "../models/Usuario";
import { UsuarioProps } from "../models/Props";

class UsuarioService {
    async criaUsuario(body: UsuarioProps) {
        const usuario = {
            nome: body.nome,
            email: body.email,
            senha: body.senha,
            saldo: 100,
            nome_time: body.nome_time
        };
        const novoUsuario = await Usuario.create(usuario);
        return novoUsuario;
    }

    async editaUsuario(id: number, body: UsuarioProps) {
        const usuarioAtualizado = await Usuario.update(body, {
            where: {
                id: id
            }
        });
        return usuarioAtualizado;
    }

    async deletaUsuario(id: number) {
        await Usuario.destroy({
            where: {
                id: id
            }
        });
    }

    async retornaUsuarioPorId(id_usuario: number) {
        const usuario = await Usuario.findByPk(id_usuario);
        if (usuario) return usuario;
        else throw new Error(`Usuario com o id - ${id_usuario} - não encontrado`);
    }

    async retornaTodosUsuarios() {
        const usuarios = await Usuario.findAll();
        return usuarios;
    }

    async retornaUsuarioPorEmail(email: string) {
        const usuario = await Usuario.findOne({ where: { email: email } });
        if (usuario) return usuario;
        else throw new Error(`Usuario com o email - ${email} - não encontrado`);
    }

    async retornaUsuarioPorNome(nome: string) {
        const usuario = await Usuario.findOne({ where: { nome: nome } });
        if (usuario) return usuario;
        else throw new Error(`Usuario com o nome - ${nome} - não encontrado`);
    }
}

export default new UsuarioService();