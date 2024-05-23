// Import necessary modules
import { JogadorProps } from "../../src/entidades/models/Props";
import ServicoJogador from "../../src/entidades/services/ServicoJogador";
import ServicoTime from "../../src/entidades/services/ServicoTime";
import { Jogador } from "../../src/entidades/models/Jogador";
import { Time } from "../../src/entidades/models/Time";

// Mock the necessary modules
jest.mock('../../src/entidades/models/Jogador.ts', () => ({
  Jogador: {
    create: jest.fn(),
    findByPk: jest.fn(),
    findOne: jest.fn()
  }
}));

jest.mock('../../src/entidades/models/Time.ts', () => ({
    Time: {
      create: jest.fn(),
      findByPk: jest.fn(),
      findOne: jest.fn()
    }
  }));

jest.mock('../../src/entidades/services/ServicoTime.ts', () => ({
  buscaTimePorCod: jest.fn(),
}));

// Define mock data
const mockJogadorProps = {
  nome: "Jogador Teste",
  foto: "foto.jpg",
  cod_time: 1,
  id_time: 1,
  posicao: "Atacante",
  preco: 100,
  cod_jogador: 1,
  status: "Ativo",
};

const mockJogadorBody = {
    nome: "Jogador Teste",
    foto: "foto.jpg",
    id_time: 1,
    posicao: "Atacante",
    preco: 100,
    cod_jogador: 1,
    status: "Ativo",
  };

const mockTime = {
  getDataValue: jest.fn().mockReturnValue(1),
};

const mockJogador = {
    id: 1,
    nome: "Jogador Teste",
    foto: "foto.jpg",
    id_time: 1,
    posicao: "Atacante",
    preco: 100,
    cod_jogador: 1,
    status: "Ativo",
};

// Begin tests
describe('criaJogador', () => {
  test('método recebe informações do jogador => busca o time com codigo correto', async () => {
    (ServicoTime.buscaTimePorCod as jest.Mock).mockResolvedValue(mockTime);
    (Jogador.create as jest.Mock).mockResolvedValue(mockJogador);

    await ServicoJogador.criaJogador(mockJogadorProps);

    expect(ServicoTime.buscaTimePorCod).toHaveBeenCalledWith(mockJogadorProps.cod_time);
  });

  test('método recebe informações do jogador => cria o jogador com as informações corretas', async () => {
    (ServicoTime.buscaTimePorCod as jest.Mock).mockResolvedValue(mockTime);
    (Jogador.create as any).mockResolvedValue(mockJogador);

    await ServicoJogador.criaJogador(mockJogadorBody);

    expect(Jogador.create).toHaveBeenCalledWith(mockJogadorBody);
  });

  test('método recebe informações do jogador => retorna o jogador com os dados corretos', async () => {
    (ServicoTime.buscaTimePorCod as jest.Mock).mockResolvedValue(mockTime);
    (Jogador.create as jest.Mock).mockResolvedValue(mockJogador);

    const result = await ServicoJogador.criaJogador(mockJogadorBody);

    expect(result).toEqual(mockJogador);
  });
});

describe('buscaJogadorPorCod', () => {
  test('método recebe codigo do jogador => retorna o jogador com os dados corretos', async () => {
    (Jogador.findOne as jest.Mock).mockResolvedValue(mockJogador);

    const result = await ServicoJogador.buscaJogadorPorCod(mockJogadorProps.cod_jogador);

    expect(result).toEqual(mockJogador);
  });

    test('método recebe codigo do jogador => nao encontra um jogador com o codigo', async () => {
        (Jogador.findOne as jest.Mock).mockResolvedValue(null);

        await expect(ServicoJogador.buscaJogadorPorCod(2)).rejects.toThrow("Jogador não encontrado");
    });
});

describe('buscaJogadorPorId', () => {
  test('método recebe id do jogador => retorna o jogador com os dados corretos', async () => {
    (Jogador.findByPk as jest.Mock).mockResolvedValue(mockJogador);

    const result = await ServicoJogador.buscaJogadorPorId(mockJogador.id!);

    expect(result).toEqual(mockJogador);
  });

    test('método recebe id do jogador => nao encontra um jogador com o id', async () => {
        (Jogador.findByPk as jest.Mock).mockResolvedValue(null);

        await expect(ServicoJogador.buscaJogadorPorId(2)).rejects.toThrow("Jogador não encontrado");
    });
});