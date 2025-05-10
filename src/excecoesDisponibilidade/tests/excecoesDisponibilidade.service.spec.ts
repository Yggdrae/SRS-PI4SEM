
import { Test, TestingModule } from '@nestjs/testing';
import { ExcecoesDisponibilidadeService } from '../excecoesDisponibilidade.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ExcecoesDisponibilidade } from '../excecoesDisponibilidade.entity';
import { Repository } from 'typeorm';
import { Salas } from 'src/salas/salas.entity';

describe('ExcecoesDisponibilidadeService', () => {
  let service: ExcecoesDisponibilidadeService;
  let salasRepository: Repository<Salas>;

  const mockSala = { id: 1 };

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };
  const mockSalasRepository = {
    findOne: jest.fn().mockResolvedValue(mockSala),
  };
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExcecoesDisponibilidadeService,
        {
          provide: 'EXCECOESDISPONIBILIDADE_REPOSITORY',
          useValue: mockRepository,
        },
        {
          provide: 'SALAS_REPOSITORY',
          useValue: mockSalasRepository,
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

    expect(await service.findAll()).toEqual(result);
  });

  it('should create an excecao', async () => {
    const dto = { salaId: 1, data: '2022-01-01', indisponivel: false, horarioInicio: '08:00', horarioFim: '09:00', motivo: 'manutenção' };
    const result = { id: 1, ...dto };

    mockRepository.save.mockResolvedValue(result);

    expect(await service.create(dto)).toEqual(result);
  });

  it('should delete an excecao', async () => {
    mockRepository.delete.mockResolvedValue({ affected: 1 });
    await expect(service.delete(1)).resolves.toBeUndefined();
  });
});
