
import { Test, TestingModule } from '@nestjs/testing';
import { ExcecoesDisponibilidadeController } from '../excecoesDisponibilidade.controller';
import { ExcecoesDisponibilidadeService } from '../excecoesDisponibilidade.service';

describe('ExcecoesDisponibilidadeController', () => {
  let controller: ExcecoesDisponibilidadeController;
  let service: ExcecoesDisponibilidadeService;

  const mockService = {
    getAll: jest.fn(),
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
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all excecoes', async () => {
    const result = [{ id: 1 }];
    mockService.getAll.mockResolvedValue(result);

    expect(await controller.getAll()).toEqual(result);
  });

  it('should create an excecao', async () => {
    const dto = {
      salaId: 1,
      data: '2022-01-01',
      indisponivel: false,
      horarioInicio: '08:00',
      horarioFim: '09:00',
      motivo: 'manutenção',
    };

    const result = { id: 1, ...dto };

    mockService.create.mockResolvedValue(result);

    expect(await controller.create(dto)).toEqual(result);
  });

  it('should delete an excecao', async () => {
    mockService.delete.mockResolvedValue(undefined);
    await expect(controller.delete(1)).resolves.toBeUndefined();
  });
});
