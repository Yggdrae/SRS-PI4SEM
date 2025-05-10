import { Test, TestingModule } from '@nestjs/testing';
import { ReservasController } from '../reservas.controller';
import { ReservasService } from '../reservas.service';

describe('ReservasController', () => {
  let controller: ReservasController;
  let service: ReservasService;

  const mockService = {
    getReservas: jest.fn(),
    getReservasFull: jest.fn(),
    createReserva: jest.fn(),
    updateReserva: jest.fn(),
    deleteReserva: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservasController],
      providers: [{ provide: ReservasService, useValue: mockService }],
    }).compile();

    controller = module.get<ReservasController>(ReservasController);
    service = module.get<ReservasService>(ReservasService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return reservas', async () => {
    const expected = [{ id: 1 }];
    mockService.getReservas.mockResolvedValue(expected);

    expect(await controller.getReservas()).toEqual(expected);
  });

  it('should return reservas full', async () => {
    const expected = [{ id: 1, usuario: {}, sala: {} }];
    mockService.getReservasFull.mockResolvedValue(expected);

    expect(await controller.getReservasFull()).toEqual(expected);
  });

  it('should create a reserva', async () => {
    const dto = { usuario: 1, sala: 1, diaHoraInicio: new Date(), diaHoraFim: new Date(), status: 'ativo', motivoCancelamento: '' };
    const expected = { id: 1, ...dto };
    mockService.createReserva.mockResolvedValue(expected);

    expect(await controller.createReserva(dto)).toEqual(expected);
  });

  it('should update a reserva', async () => {
    const dto = { status: 'cancelado' };
    const expected = { id: 1, status: 'cancelado' };
    mockService.updateReserva.mockResolvedValue(expected);

    expect(await controller.updateReserva(1, dto)).toEqual(expected);
  });

  it('should delete a reserva', async () => {
    mockService.deleteReserva.mockResolvedValue(undefined);

    await expect(controller.deleteReserva(1)).resolves.toBeUndefined();
  });
});
