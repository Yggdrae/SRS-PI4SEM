
import { Test, TestingModule } from '@nestjs/testing';
import { SalasController } from '../salas.controller';
import { SalasService } from '../salas.service';

describe('SalasController', () => {
  let controller: SalasController;
  let service: SalasService;

  const mockService = {
    getSalas: jest.fn(),
    createSalas: jest.fn(),
    updateSalas: jest.fn(),
    deleteSalas: jest.fn(),
    getSalasDestaque: jest.fn(),
    getSalaById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalasController],
      providers: [
        {
          provide: SalasService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<SalasController>(SalasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all salas', async () => {
    const result = [{ id: 1, numero: 101 }];
    mockService.getSalas.mockResolvedValue(result);
    expect(await controller.getSalas()).toEqual(result);
  });

  it('should return sala by id', async () => {
    const result = { id: 1, numero: 101 };
    mockService.getSalaById.mockResolvedValue(result);
    expect(await controller.getSalaById(1)).toEqual(result);
  });

  it('should return salas destaque', async () => {
    const result = [{ id: 1, numero: 101, isDestaque: true }];
    mockService.getSalasDestaque.mockResolvedValue(result);
    expect(await controller.getSalasDestaque()).toEqual(result);
  });

  it('should create a sala', async () => {
    const dto = { numero: 101, andar: 1, valorHora: 20, isDestaque: false };
    const created = { id: 1, ...dto };
    mockService.createSalas.mockResolvedValue(created);
    expect(await controller.createSalas(dto)).toEqual(created);
  });

  it('should update a sala', async () => {
    const dto = { valorHora: 25 };
    const updated = { id: 1, numero: 101, valorHora: 25 };
    mockService.updateSalas.mockResolvedValue(updated);
    expect(await controller.updateSalas(1, dto)).toEqual(updated);
  });

  it('should delete a sala', async () => {
    mockService.deleteSalas.mockResolvedValue(undefined);
    await expect(controller.deleteSalas(1)).resolves.toBeUndefined();
  });
});
