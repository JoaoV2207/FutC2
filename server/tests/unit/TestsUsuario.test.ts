import { UsuarioProps } from "../../src/entidades/models/Props";
import { Usuario } from "../../src/entidades/models/Usuario";
import ServicosUsuario from "../../src/entidades/services/ServicosUsuario";

jest.mock('../../src/entidades/models/Usuario.ts', () => ({
  Usuario: {
    create: jest.fn(),
    findByPk: jest.fn()
  }
}));

const mockUsuario = {
  nome: "Usuario Teste",
  email: "teste@teste.com",
  senha: "123456",
  saldo: 100,
  nome_time: "Time Teste"
} as UsuarioProps;

const mockBodyUsuario = {
  nome: "Usuario Teste",
  email: "teste@teste.com",
  senha: "123456",
  saldo: 100,
  nome_time: "Time Teste"
} as UsuarioProps;

describe('criaUsuario', () => {

    test('método recebe um objeto com as informações do usuario => chama o create com os dados corretos', async () => {
      const mockBodyUsuario = {
        nome: "Usuario Teste",
        email: "teste@teste.com",
        senha: "123456",
        saldo: 100,
        nome_time: "Time Teste"
      } as UsuarioProps;
  
      (Usuario.create as any).mockResolvedValue(mockUsuario);
      
      await ServicosUsuario.criaUsuario(mockBodyUsuario);
  
      expect(Usuario.create).toHaveBeenCalledWith(mockBodyUsuario);
      expect(Usuario.create).toHaveBeenCalledTimes(1);
    });  

    test('método recebe um objeto com as informações do usuario => chama o create com os dados corretos', async () => {
  
      (Usuario.create as any).mockResolvedValue(mockUsuario);
      
      const usuario = await ServicosUsuario.criaUsuario(mockBodyUsuario);
  
      expect(usuario).toEqual(mockUsuario);
    }); 
  });

  describe('buscaUsuario', () => {

    test('método recebe um id => chama o findByPk com o id correto', async () => {
      const mockIdUsuario = 1;
  
      (Usuario.findByPk as any).mockResolvedValue(mockUsuario);
      
      await ServicosUsuario.retornaUsuarioPorId(mockIdUsuario);
  
      expect(Usuario.findByPk).toHaveBeenCalledWith(mockIdUsuario);
      expect(Usuario.findByPk).toHaveBeenCalledTimes(1);
    });  

    test('método recebe um id => retorna o usuario correto', async () => {
      const mockIdUsuario = 1;
  
      (Usuario.findByPk as any).mockResolvedValue(mockUsuario);
      
      const usuario = await ServicosUsuario.retornaUsuarioPorId(mockIdUsuario);
  
      expect(usuario).toEqual(mockUsuario);
    }); 

    test('método recebe um id => nao encontra o usuario', async () => {
      const id = 2;
  
      (Usuario.findByPk as any).mockResolvedValue(null);
      
      await expect(ServicosUsuario.retornaUsuarioPorId(id)).rejects.toThrow(`Usuario com o id - ${id} - não encontrado`);
    });
  });