/*import { Test, TestingModule } from '@nestjs/testing';
import { DisponibilidadeSalasController } from '../disponibilidadeSalas.controller';
import { DisponibilidadeSalasService } from '../disponibilidadeSalas.service';
import { CreateDisponibilidadeSalasDTO } from '../dto/disponibilidadeSalas.dto';

describe('DisponibilidadeSalasController', () => {
    let controller: DisponibilidadeSalasController;
    let service: DisponibilidadeSalasService;

    const mockDisponibilidade = {
        id: 1,
        data: '2025-05-01',
        horarioInicio: '09:00',
        horarioFim: '12:00',
        sala: { id: 1 },
    };

    const mockService = {
        findAll: jest.fn().mockResolvedValue([mockDisponibilidade]),
        create: jest.fn().mockImplementation((dto: CreateDisponibilidadeSalasDTO) => ({
            ...dto,
            id: 1,
            sala: { id: dto.salaId },
        })),
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
        service = module.get<DisponibilidadeSalasService>(DisponibilidadeSalasService);
    });

    it('deve retornar todas as disponibilidades', async () => {
        const result = await controller.getAll();
        expect(result).toEqual([mockDisponibilidade]);
    });

    it('deve criar uma nova disponibilidade', async () => {
        const dto: CreateDisponibilidadeSalasDTO = {
        data: '2025-05-01',
            horarioInicio: '09:00',
            horarioFim: '12:00',
            salaId: 1,
        };

        const result = await controller.create(dto);
        expect(result).toEqual({
            ...dto,
            id: 1,
            sala: { id: 1 },
        });
        expect(mockService.create).toHaveBeenCalledWith(dto);
    });
});
