
import { Test, TestingModule } from '@nestjs/testing';
import { DisponibilidadeSalasController } from '../disponibilidadeSalas.controller';
import { DisponibilidadeSalasService } from '../disponibilidadeSalas.service';

describe('DisponibilidadeSalasController', () => {
  let controller: DisponibilidadeSalasController;
  let service: DisponibilidadeSalasService;

  const mockService = {
    getHorarioReal: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DisponibilidadeSalasController],
      providers: [
        {
          provide: DisponibilidadeSalasService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<DisponibilidadeSalasController>(DisponibilidadeSalasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return horario real', async () => {
    const mockResult = [{ horarioInicio: '08:00', horarioFim: '09:00' }];
    mockService.getHorarioReal.mockResolvedValue(mockResult);
    expect(await controller.getHorarioReal(1, '2025-05-01')).toEqual(mockResult);
  });

  it('should return all disponibilidades', async () => {
    const mockResult = [{ id: 1 }];
    mockService.findAll.mockResolvedValue(mockResult);
    expect(await controller.getAll()).toEqual(mockResult);
  });

  it('should create a disponibilidade', async () => {
    const dto = { salaId: 1, diaDaSemana: 2, horarioInicio: '08:00', horarioFim: '10:00' };
    const mockResponse = { id: 1, ...dto };
    mockService.create.mockResolvedValue(mockResponse);
    expect(await controller.create(dto)).toEqual(mockResponse);
  });

  it('should delete a disponibilidade', async () => {
    mockService.delete.mockResolvedValue(undefined);
    await expect(controller.delete(1)).resolves.toBeUndefined();
  });
});
