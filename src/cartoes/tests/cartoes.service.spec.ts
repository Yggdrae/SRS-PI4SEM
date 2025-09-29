import { Test, TestingModule } from '@nestjs/testing';
import { CartoesService } from '../cartoes.service';
import { Repository } from 'typeorm';
import { Cartao } from '../cartoes.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateCartaoDTO } from '../dto/create-cartao.dto';

describe('CartoesService', () => {
  let service: CartoesService;
  let repo: Repository<Cartao>;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartoesService,
        {
          provide: 'CARTOES_REPOSITORY',
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<CartoesService>(CartoesService);
    repo = module.get<Repository<Cartao>>('CARTOES_REPOSITORY');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new card', async () => {
    const dto: CreateCartaoDTO = {
      numero: '1234567890123456',
      nomeTitular: 'Fulano',
      validade: '12/30',
      cvv: '123',
      bandeira: 'Mastecard',
      usuarioId: 1,
    };

    const created = { ...dto, id: 1 };
    mockRepository.create.mockReturnValue(created);
    mockRepository.save.mockResolvedValue(created);

    const result = await service.create(dto);
    expect(result).toEqual(created);
    expect(mockRepository.create).toHaveBeenCalled();
    expect(mockRepository.save).toHaveBeenCalledWith(created);
  });

  it('should find cards by user', async () => {
    const cards = [{ id: 1, usuario: { id: 1 } }];
    mockRepository.find.mockResolvedValue(cards);

    expect(await service.findByUsuario(1)).toEqual(cards);
    expect(mockRepository.find).toHaveBeenCalledWith({ where: { usuario: { id: 1 } } });
  });

  it('should delete a card', async () => {
    mockRepository.delete.mockResolvedValue({ affected: 1 });
    await expect(service.delete(1)).resolves.toBeUndefined();
  });
});
