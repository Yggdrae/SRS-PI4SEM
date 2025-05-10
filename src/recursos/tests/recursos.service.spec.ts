
import { Test, TestingModule } from '@nestjs/testing';
import { RecursosService } from '../recursos.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Recursos } from '../recursos.entity';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('RecursosService', () => {
  let service: RecursosService;

  const mockRepository = {
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecursosService,
        {
          provide: 'RECURSOS_REPOSITORY',
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<RecursosService>(RecursosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all recursos', async () => {
    const result = [{ id: 1, nome: 'Projetor' }];
    mockRepository.find.mockResolvedValue(result);
    expect(await service.getRecursos()).toEqual(result);
  });

  it('should create a recurso', async () => {
    const dto = { nome: 'Notebook' };
    const recurso = { id: 2, nome: 'Notebook' };
    mockRepository.create.mockReturnValue(recurso);
    mockRepository.save.mockResolvedValue(recurso);
    expect(await service.createRecurso(dto)).toEqual(recurso);
  });

  it('should throw if creating recurso without nome', async () => {
    await expect(service.createRecurso({ nome: '' })).rejects.toThrow(BadRequestException);
  });

  it('should update a recurso', async () => {
    const original = { id: 1, nome: 'Projetor' };
    const updated = { id: 1, nome: 'Projetor HD' };

    mockRepository.findOne.mockResolvedValue(original);
    mockRepository.save.mockResolvedValue(updated);

    expect(await service.updateRecurso(1, { nome: 'Projetor HD' })).toEqual(updated);
  });

  it('should throw if recurso to update not found', async () => {
    mockRepository.findOne.mockResolvedValue(null);
    await expect(service.updateRecurso(99, { nome: 'Novo' })).rejects.toThrow(NotFoundException);
  });

  it('should delete a recurso', async () => {
    mockRepository.delete.mockResolvedValue({ affected: 1 });
    await expect(service.deleteRecurso(1)).resolves.toBeUndefined();
  });

  it('should throw if recurso to delete not found', async () => {
    mockRepository.delete.mockResolvedValue({ affected: 0 });
    await expect(service.deleteRecurso(99)).rejects.toThrow(NotFoundException);
  });
});
