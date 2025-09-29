
import { Test, TestingModule } from '@nestjs/testing';
import { SalasRecursosController } from '../salasRecursos.controller';
import { SalasRecursosService } from '../salasRecursos.service';

describe('SalasRecursosController', () => {
  let controller: SalasRecursosController;
  let service: SalasRecursosService;

  const mockService = {
    getSalasRecursos: jest.fn(),
    createSalasRecursos: jest.fn(),
    updateSalasRecursos: jest.fn(),
    deleteSalasRecursos: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalasRecursosController],
      providers: [
        {
          provide: SalasRecursosService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<SalasRecursosController>(SalasRecursosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all salasRecursos', async () => {
    const result = [{ id: 1 }];
    mockService.getSalasRecursos.mockResolvedValue(result);
    expect(await controller.getAll()).toEqual(result);
  });

  it('should create a salasRecursos', async () => {
    const dto = { sala: 1, recurso: 2, quantidade: 5 };
    const result = { id: 1, ...dto };
    mockService.createSalasRecursos.mockResolvedValue(result);
    expect(await controller.create(dto)).toEqual(result);
  });

  it('should update salasRecursos', async () => {
    const dto = { quantidade: 10 };
    const result = { id: 1, quantidade: 10 };
    mockService.updateSalasRecursos.mockResolvedValue(result);
    expect(await controller.update(1, dto)).toEqual(result);
  });

  it('should delete salasRecursos', async () => {
    mockService.deleteSalasRecursos.mockResolvedValue(undefined);
    await expect(controller.delete(1)).resolves.toBeUndefined();
  });
});
