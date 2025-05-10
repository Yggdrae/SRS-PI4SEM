
import { Test, TestingModule } from '@nestjs/testing';
import { SalasRecursosService } from '../salasRecursos.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SalasRecursos } from '../salasRecursos.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('SalasRecursosService', () => {
  let service: SalasRecursosService;

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
        SalasRecursosService,
        {
          provide: 'SALASRECURSOS_REPOSITORY',
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<SalasRecursosService>(SalasRecursosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all salasRecursos', async () => {
    const result = [{ id: 1 }];
    mockRepository.find.mockResolvedValue(result);
    expect(await service.getSalasRecursos()).toEqual(result);
  });

  it('should create salasRecursos', async () => {
    const dto = { sala: 1, recurso: 2, quantidade: 3 };
    const entity = { id: 1, ...dto };
    mockRepository.create.mockReturnValue(entity);
    mockRepository.save.mockResolvedValue(entity);
    expect(await service.createSalasRecursos(dto)).toEqual(entity);
  });

  it('should throw if required fields missing on create', async () => {
    await expect(service.createSalasRecursos({ sala: null, recurso: null, quantidade: null }))
      .rejects.toThrow(BadRequestException);
  });

  it('should update salasRecursos', async () => {
    const original = { id: 1, quantidade: 3 };
    const updated = { id: 1, quantidade: 5 };
    mockRepository.findOne.mockResolvedValue(original);
    mockRepository.save.mockResolvedValue(updated);
    expect(await service.updateSalasRecursos(1, { quantidade: 5 })).toEqual(updated);
  });

  it('should throw if salasRecursos to update not found', async () => {
    mockRepository.findOne.mockResolvedValue(null);
    await expect(service.updateSalasRecursos(99, { quantidade: 5 })).rejects.toThrow(NotFoundException);
  });

  it('should delete salasRecursos', async () => {
    mockRepository.delete.mockResolvedValue({ affected: 1 });
    await expect(service.deleteSalasRecursos(1)).resolves.toBeUndefined();
  });

  it('should throw if salasRecursos to delete not found', async () => {
    mockRepository.delete.mockResolvedValue({ affected: 0 });
    await expect(service.deleteSalasRecursos(99)).rejects.toThrow(NotFoundException);
  });
});
