/*import { Test, TestingModule } from '@nestjs/testing';
import { DisponibilidadeSalasService } from '../disponibilidadeSalas.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DisponibilidadeSalas } from '../disponibilidadeSalas.entity';
import { Repository } from 'typeorm';

describe('DisponibilidadeSalasService', () => {
    let service: DisponibilidadeSalasService;
    let repo: Repository<DisponibilidadeSalas>;

    const mockDisponibilidade: DisponibilidadeSalas = {
        id: 1,
        data: '2025-05-01',
        horarioInicio: '09:00',
        horarioFim: '12:00',
        sala: { id: 1 } as any,
    };

    const mockRepo = {
        find: jest.fn().mockResolvedValue([mockDisponibilidade]),
        findOne: jest.fn().mockResolvedValue(mockDisponibilidade),
        create: jest.fn().mockImplementation(dto => dto),
        save: jest.fn().mockImplementation(dto => Promise.resolve({ id: 1, ...dto })),
        delete: jest.fn().mockResolvedValue({ affected: 1 }),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DisponibilidadeSalasService,
                {
                    provide: getRepositoryToken(DisponibilidadeSalas),
                    useValue: mockRepo,
                },
            ],
        }).compile();

        service = module.get<DisponibilidadeSalasService>(DisponibilidadeSalasService);
        repo = module.get<Repository<DisponibilidadeSalas>>(getRepositoryToken(DisponibilidadeSalas));
    });

    it('deve retornar todas as disponibilidades', async () => {
        const result = await service.findAll();
        expect(result).toEqual([mockDisponibilidade]);
    });

    it('deve criar uma disponibilidade', async () => {
        const dto = {
            data: '2025-05-01',
            horarioInicio: '09:00',
            horarioFim: '12:00',
            salaId: 1,
        };
        
        const result = await service.create(dto);
        expect(result).toHaveProperty('id');
        expect(repo.create).toHaveBeenCalledWith(dto);
        expect(repo.save).toHaveBeenCalled();
    });
});
