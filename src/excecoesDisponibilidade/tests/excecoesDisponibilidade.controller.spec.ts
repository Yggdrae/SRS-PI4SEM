import { Test, TestingModule } from '@nestjs/testing';
import { ExcecoesDisponibilidadeController } from '../excecoesDisponibilidade.controller';
import { ExcecoesDisponibilidadeService } from '../excecoesDisponibilidade.service';
import { ExcecoesDisponibilidade } from '../excecoesDisponibilidade.entity';

describe('ExcecoesDisponibilidadeController', () => {
  let controller: ExcecoesDisponibilidadeController;
  let service: ExcecoesDisponibilidadeService;

  const mockService = {
    findAll: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExcecoesDisponibilidadeController],
      providers: [
        {
          provide: ExcecoesDisponibilidadeService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<ExcecoesDisponibilidadeController>(ExcecoesDisponibilidadeController);
    service = module.get<ExcecoesDisponibilidadeService>(ExcecoesDisponibilidadeService);
  });

  afterEach(() => jest.clearAllMocks());

  it('deve retornar todas as exceções', async () => {
    const excecoes = [{ id: 1 }, { id: 2 }] as ExcecoesDisponibilidade[];
    mockService.findAll.mockResolvedValue(excecoes);

    const result = await controller.getAll();
    expect(result).toEqual(excecoes);
    expect(mockService.findAll).toHaveBeenCalled();
  });

  it('deve criar uma nova exceção', async () => {
    const dto = {
      salaId: 1,
      data: '2025-05-20',
      indisponivel: true,
      motivo: 'Reforma',
      horarioInicio: '08:00',
      horarioFim: '10:00',
      
    };
    const excecaoCriada = { id: 1, ...dto } as any;

    mockService.create.mockResolvedValue(excecaoCriada);

    const result = await controller.create(dto);
    expect(result).toEqual(excecaoCriada);
    expect(mockService.create).toHaveBeenCalledWith(dto);
  });

  it('deve deletar uma exceção existente', async () => {
    mockService.delete.mockResolvedValue(undefined);

    await expect(controller.delete(1)).resolves.toBeUndefined();
    expect(mockService.delete).toHaveBeenCalledWith(1);
  });
});