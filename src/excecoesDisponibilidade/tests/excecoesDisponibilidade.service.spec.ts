import { Test, TestingModule } from '@nestjs/testing';
import { ExcecoesDisponibilidadeService } from '../excecoesDisponibilidade.service';
import { Repository } from 'typeorm';
import { ExcecoesDisponibilidade } from '../excecoesDisponibilidade.entity';
import { Salas } from 'src/salas/salas.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

describe('ExcecoesDisponibilidadeService', () => {
  let service: ExcecoesDisponibilidadeService;
  let excecaoRepo: Repository<ExcecoesDisponibilidade>;
  let salasRepo: Repository<Salas>;

  const mockExcecaoRepo = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    delete: jest.fn(),
  };

  const mockSalasRepo = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExcecoesDisponibilidadeService,
        { provide: 'EXCECOESDISPONIBILIDADE_REPOSITORY', useValue: mockExcecaoRepo },
        { provide: 'SALAS_REPOSITORY', useValue: mockSalasRepo },
      ],
    }).compile();

    service = module.get<ExcecoesDisponibilidadeService>(ExcecoesDisponibilidadeService);
    excecaoRepo = module.get('EXCECOESDISPONIBILIDADE_REPOSITORY');
    salasRepo = module.get('SALAS_REPOSITORY');
  });

  afterEach(() => jest.clearAllMocks());

  it('deve criar uma exceção com dados válidos', async () => {
    const dto = {
      salaId: 1,
      data: '2025-05-20',
      indisponivel: true,
      motivo: 'Manutenção',
      horarioInicio: '10:00',
      horarioFim: '12:00',
    };

    const sala = { id: 1 } as Salas;
    const excecao = { id: 1, ...dto, sala } as ExcecoesDisponibilidade;

    mockSalasRepo.findOne.mockResolvedValue(sala);
    mockExcecaoRepo.create.mockReturnValue(excecao);
    mockExcecaoRepo.save.mockResolvedValue(excecao);

    const result = await service.create(dto);
    expect(result).toEqual(excecao);
    expect(mockSalasRepo.findOne).toHaveBeenCalledWith({ where: { id: dto.salaId } });
    expect(mockExcecaoRepo.create).toHaveBeenCalled();
    expect(mockExcecaoRepo.save).toHaveBeenCalledWith(excecao);
  });

  it('deve lançar NotFoundException se sala não for encontrada', async () => {
    mockSalasRepo.findOne.mockResolvedValue(null);

    await expect(
      service.create({
        salaId: 999,
        data: '2025-05-20',
        indisponivel: true,
        motivo: 'Fechado',
        horarioInicio: '08:00',
        horarioFim: '08:00',
      }),
    ).rejects.toThrow(NotFoundException);
  });

  it('deve retornar todas as exceções com a sala relacionada', async () => {
    const excecoes = [{ id: 1, sala: { id: 1 }, data: '2025-05-20' }] as ExcecoesDisponibilidade[];
    mockExcecaoRepo.find.mockResolvedValue(excecoes);

    const result = await service.findAll();
    expect(result).toEqual(excecoes);
    expect(mockExcecaoRepo.find).toHaveBeenCalledWith({ relations: ['sala'] });
  });

  it('deve deletar uma exceção existente', async () => {
    mockExcecaoRepo.delete.mockResolvedValue({ affected: 1 });

    await expect(service.delete(1)).resolves.toBeUndefined();
    expect(mockExcecaoRepo.delete).toHaveBeenCalledWith(1);
  });

  it('deve lançar NotFoundException se exceção não for encontrada', async () => {
    mockExcecaoRepo.delete.mockResolvedValue({ affected: 0 });

    await expect(service.delete(999)).rejects.toThrow(NotFoundException);
  });
});