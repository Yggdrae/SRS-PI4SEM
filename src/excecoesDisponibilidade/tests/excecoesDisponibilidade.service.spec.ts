
import { Test, TestingModule } from '@nestjs/testing';
import { ExcecoesDisponibilidadeService } from '../excecoesDisponibilidade.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ExcecaoDisponibilidade } from '../excecoesDisponibilidade.entity';

describe('ExcecoesDisponibilidadeService', () => {
  let service: ExcecoesDisponibilidadeService;

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExcecoesDisponibilidadeService,
        {
          provide: 'EXCECOES_REPOSITORY',
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ExcecoesDisponibilidadeService>(ExcecoesDisponibilidadeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all excecoes', async () => {
    const result = [{ id: 1 }];
    mockRepository.find.mockResolvedValue(result);

    expect(await service.getAll()).toEqual(result);
  });

  it('should create an excecao', async () => {
    const dto = { sala: 1, dataInicio: new Date(), dataFim: new Date(), motivo: 'manutenção' };
    const result = { id: 1, ...dto };

    mockRepository.save.mockResolvedValue(result);

    expect(await service.create(dto)).toEqual(result);
  });

  it('should delete an excecao', async () => {
    mockRepository.delete.mockResolvedValue({ affected: 1 });
    await expect(service.delete(1)).resolves.toBeUndefined();
  });
});
