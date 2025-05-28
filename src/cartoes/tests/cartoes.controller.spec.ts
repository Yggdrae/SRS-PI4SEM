import { Test, TestingModule } from '@nestjs/testing';
import { CartoesController } from '../cartoes.controller';
import { CartoesService } from '../cartoes.service';
import { CreateCartaoDTO } from '../dto/create-cartao.dto';

describe('CartoesController', () => {
  let controller: CartoesController;
  let service: CartoesService;

  const mockService = {
    create: jest.fn(),
    findByUsuario: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartoesController],
      providers: [
        {
          provide: CartoesService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<CartoesController>(CartoesController);
    service = module.get<CartoesService>(CartoesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a card', async () => {
    const dto: CreateCartaoDTO = {
      numero: '1234567890123456',
      nomeTitular: 'Fulano',
      validade: '12/30',
      cvv: '123',
      bandeira: 'Mastercard',
      usuarioId: 1,
    };

    const expected = { id: 1, ...dto };
    mockService.create.mockResolvedValue(expected);

    expect(await controller.create(dto)).toEqual(expected);
  });

  it('should find cards by user', async () => {
    const result = [{ id: 1, usuario: { id: 1 } }];
    mockService.findByUsuario.mockResolvedValue(result);

    expect(await controller.findByUsuario(1)).toEqual(result);
  });

  it('should delete a card', async () => {
    mockService.delete.mockResolvedValue(undefined);
    await expect(controller.delete(1)).resolves.toBeUndefined();
  });
});
