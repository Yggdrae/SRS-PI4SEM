
import { Test, TestingModule } from '@nestjs/testing';
import { SalasService } from '../salas.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Salas } from '../salas.entity';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('SalasService', () => {
  let service: SalasService;

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SalasService,
        {
          provide: 'SALAS_REPOSITORY',
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<SalasService>(SalasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all salas', async () => {
    const result = [{ id: 1 }];
    mockRepository.find.mockResolvedValue(result);
    expect(await service.getSalas()).toEqual(result);
  });

  it('should return sala by id', async () => {
    const sala = { id: 1 };
    mockRepository.findOne.mockResolvedValue(sala);
    expect(await service.getSalaById(1)).toEqual(sala);
  });

  it('should throw if sala not found by id', async () => {
    mockRepository.findOne.mockResolvedValue(null);
    await expect(service.getSalaById(99)).rejects.toThrow(NotFoundException);
  });

  it('should return salas destaque', async () => {
    const result = [{ id: 1, isDestaque: true }];
    mockRepository.find.mockResolvedValue(result);
    expect(await service.getSalasDestaque()).toEqual(result);
  });

  it('should create a sala', async () => {
    const dto = { numero: 101, andar: 1, valorHora: 20, isDestaque: false };
    const created = { id: 1, ...dto };
    mockRepository.create.mockReturnValue(created);
    mockRepository.save.mockResolvedValue(created);
    expect(await service.createSalas(dto)).toEqual(created);
  });

  it('should throw if required fields are missing in create', async () => {
    await expect(service.createSalas({ numero: null, andar: null, valorHora: null, isDestaque: false }))
      .rejects.toThrow(BadRequestException);
  });

  it('should update a sala', async () => {
    const sala = { id: 1, numero: 101, valorHora: 20 };
    mockRepository.findOne.mockResolvedValue(sala);
    mockRepository.save.mockResolvedValue({ ...sala, valorHora: 25 });
    const result = await service.updateSalas(1, { valorHora: 25 });
    expect(result.valorHora).toBe(25);
  });

  it('should throw if sala to update not found', async () => {
    mockRepository.findOne.mockResolvedValue(null);
    await expect(service.updateSalas(99, { valorHora: 25 })).rejects.toThrow(NotFoundException);
  });

  it('should delete a sala', async () => {
    mockRepository.delete.mockResolvedValue({ affected: 1 });
    await expect(service.deleteSalas(1)).resolves.toBeUndefined();
  });

  it('should throw if sala to delete not found', async () => {
    mockRepository.delete.mockResolvedValue({ affected: 0 });
    await expect(service.deleteSalas(99)).rejects.toThrow(NotFoundException);
  });
});
