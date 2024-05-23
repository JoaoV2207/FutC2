// FILEPATH: /h:/Documentos/CODE/FutFantasy/server/tests/unit/TestsServicoTime.test.ts

import { TimeProps } from "../../src/entidades/models/Props";
import { Time } from "../../src/entidades/models/Time";
import ServicoTime from "../../src/entidades/services/ServicoTime";

jest.mock('../../src/entidades/models/Time.ts', () => ({
  Time: {
    create: jest.fn(),
    findByPk: jest.fn(),
    findOne: jest.fn()
  }
}));

const mockBodyTime = {
  nome: "Time Teste",
  abreviacao: "TT",
  escudo: "escudo.png",
  cod_time: 123
} as TimeProps;

const mockTime = {
  id: 1,
  nome: "Time Teste",
  abreviacao: "TT",
  escudo: "escudo.png",
  cod_time: 123
} as TimeProps;


describe('criaTime', () => {

  test('método recebe um objeto com as informações do time => chama o create com os dados corretos', async () => {
    (Time.create as any).mockResolvedValue(mockTime);
    
    await ServicoTime.criaTime(mockBodyTime);

    expect(Time.create).toHaveBeenCalledWith(mockBodyTime);
    expect(Time.create).toHaveBeenCalledTimes(1);
  });  

  test('método recebe um objeto com as informações do time => retorna o time criado', async () => {

    (Time.create as any).mockResolvedValue(mockTime);
    
    const time = await ServicoTime.criaTime(mockBodyTime);

    expect(time).toEqual(mockTime);
  }); 
});

describe('buscaTimePorId', () => {

  test('método recebe um id => chama o findByPk com o id correto', async () => {
    (Time.findByPk as any).mockResolvedValue(mockTime);
    
    await ServicoTime.buscaTimePorId(mockTime.id!);

    expect(Time.findByPk).toHaveBeenCalledWith(mockTime.id);
    expect(Time.findByPk).toHaveBeenCalledTimes(1);
  });  

  test('método recebe um id => retorna o time encontrado', async () => {

    (Time.findByPk as any).mockResolvedValue(mockTime);
    
    const time = await ServicoTime.buscaTimePorId(mockTime.id!);

    expect(time).toEqual(mockTime);
  }); 

    test('método recebe um id => não encontra o time', async () => {
        
        (Time.findByPk as jest.Mock).mockResolvedValue(null);
    
        await expect(ServicoTime.buscaTimePorId(mockTime.id!)).rejects.toThrow("Time não encontrado");
    });
});

describe('buscaTimePorCodTime', () => {

  test('método recebe um cod_time => chama o findOne com o cod_time correto', async () => {
    (Time.findOne as any).mockResolvedValue(mockTime);
    
    await ServicoTime.buscaTimePorCod(mockTime.cod_time!);

    expect(Time.findOne).toHaveBeenCalledWith({ where: { cod_time: mockTime.cod_time } });
    expect(Time.findOne).toHaveBeenCalledTimes(1);
  });  

  test('método recebe um cod_time => retorna o time encontrado', async () => {

    (Time.findOne as any).mockResolvedValue(mockTime);
    
    const time = await ServicoTime.buscaTimePorCod(mockTime.cod_time!);

    expect(time).toEqual(mockTime);
  }); 

    test('método recebe um cod_time => não encontra o time', async () => {
        
            (Time.findOne as jest.Mock).mockResolvedValue(null);
        
            await expect(ServicoTime.buscaTimePorCod(mockTime.cod_time!)).rejects.toThrow("Time não encontrado");
        });
});

describe('buscaTimePorNome', () => {

  test('método recebe um nome => chama o findOne com o nome correto', async () => {
    (Time.findOne as any).mockResolvedValue(mockTime);
    
    await ServicoTime.buscaTimePorNome(mockTime.nome!);

    expect(Time.findOne).toHaveBeenCalledWith({ where: { nome: mockTime.nome } });
  });  

  test('método recebe um nome => retorna o time encontrado', async () => {

    (Time.findOne as any).mockResolvedValue(mockTime);
    
    const time = await ServicoTime.buscaTimePorNome(mockTime.nome!);

    expect(time).toEqual(mockTime);
  }); 

  test('método recebe um nome => não encontra o time', async () => {
    
        (Time.findOne as jest.Mock).mockResolvedValue(null);
    
        await expect(ServicoTime.buscaTimePorNome(mockTime.nome!)).rejects.toThrow("Time não encontrado");
    });
});