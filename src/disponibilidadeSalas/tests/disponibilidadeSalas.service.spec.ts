
import { Test, TestingModule } from '@nestjs/testing';
import { DisponibilidadeSalasService } from '../disponibilidadeSalas.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DisponibilidadeSalas } from '../disponibilidadeSalas.entity';
import { Salas } from 'src/salas/salas.entity';
import { ExcecoesDisponibilidade } from 'src/excecoesDisponibilidade/excecoesDisponibilidade.entity';
import { Reservas } from 'src/reservas/reservas.entity';
import { NotFoundException } from '@nestjs/common';

describe('DisponibilidadeSalasService', () => {
  let service: DisponibilidadeSalasService;

  const mockRepo = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  const mockSalaRepo = { findOne: jest.fn() };
  const mockExcecaoRepo = { findOne: jest.fn() };
  const mockReservaRepo = { find: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DisponibilidadeSalasService,
        { provide: 'DISPONIBILIDADESALAS_REPOSITORY', useValue: mockRepo },
        { provide: 'SALAS_REPOSITORY', useValue: mockSalaRepo },
        { provide: 'EXCECOESDISPONIBILIDADE_REPOSITORY', useValue: mockExcecaoRepo },
        { provide: 'RESERVAS_REPOSITORY', useValue: mockReservaRepo },
      ],
    }).compile();

    service = module.get<DisponibilidadeSalasService>(DisponibilidadeSalasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all disponibilidades', async () => {
    const result = [{ id: 1 }];
    mockRepo.find.mockResolvedValue(result);
    expect(await service.findAll()).toEqual(result);
  });

  it('should throw when creating for non-existent sala', async () => {
    mockSalaRepo.findOne.mockResolvedValue(null);
    await expect(service.create({
      salaId: 99,
      diaDaSemana: 2,
      horarioInicio: '08:00',
      horarioFim: '10:00'
    })).rejects.toThrow(NotFoundException);
  });

  it('should delete a disponibilidade', async () => {
    mockRepo.delete.mockResolvedValue({ affected: 1 });
    await expect(service.delete(1)).resolves.toBeUndefined();
  });

  it('should throw if delete finds nothing', async () => {
    mockRepo.delete.mockResolvedValue({ affected: 0 });
    await expect(service.delete(999)).rejects.toThrow(NotFoundException);
  });
});
