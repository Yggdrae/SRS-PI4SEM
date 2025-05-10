
import { Test, TestingModule } from '@nestjs/testing';
import { SalasImagensService } from '../salasImagens.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SalasImagens } from '../salasImagens.entity';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('SalasImagensService', () => {
  let service: SalasImagensService;

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
        SalasImagensService,
        {
          provide: 'SALASIMAGENS_REPOSITORY',
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<SalasImagensService>(SalasImagensService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all imagens', async () => {
    const result = [{ id: 1 }];
    mockRepository.find.mockResolvedValue(result);
    expect(await service.getImagens()).toEqual(result);
  });

  it('should return imagem by id', async () => {
    const imagem = { id: 1 };
    mockRepository.findOne.mockResolvedValue(imagem);
    expect(await service.getImagemById(1)).toEqual(imagem);
  });

  it('should throw if imagem not found by id', async () => {
    mockRepository.findOne.mockResolvedValue(null);
    await expect(service.getImagemById(99)).rejects.toThrow(NotFoundException);
  });

  it('should create imagem', async () => {
    const dto = { sala: 1, imagem: Buffer.from('img'), nomeArquivo: 'foto.png', tipoMime: 'image/png' };
    const entity = { id: 1, ...dto };
    mockRepository.create.mockReturnValue(entity);
    mockRepository.save.mockResolvedValue(entity);
    expect(await service.createImagem(dto)).toEqual(entity);
  });

  it('should throw if creating imagem with missing data', async () => {
    await expect(service.createImagem({} as any)).rejects.toThrow(BadRequestException);
  });

  it('should delete imagem', async () => {
    mockRepository.delete.mockResolvedValue({ affected: 1 });
    await expect(service.deleteImagem(1)).resolves.toBeUndefined();
  });

  it('should throw if imagem to delete not found', async () => {
    mockRepository.delete.mockResolvedValue({ affected: 0 });
    await expect(service.deleteImagem(99)).rejects.toThrow(NotFoundException);
  });
});
