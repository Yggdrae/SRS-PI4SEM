
import { Test, TestingModule } from '@nestjs/testing';
import { SalasImagensController } from '../salasImagens.controller';
import { SalasImagensService } from '../salasImagens.service';

describe('SalasImagensController', () => {
  let controller: SalasImagensController;
  let service: SalasImagensService;

  const mockService = {
    getImagens: jest.fn(),
    getImagemById: jest.fn(),
    createImagem: jest.fn(),
    deleteImagem: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalasImagensController],
      providers: [
        {
          provide: SalasImagensService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<SalasImagensController>(SalasImagensController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all imagens', async () => {
    const result = [{ id: 1 }];
    mockService.getImagens.mockResolvedValue(result);
    expect(await controller.getImagens()).toEqual(result);
  });

  it('should return imagem by id', async () => {
    const result = { id: 1 };
    mockService.getImagemById.mockResolvedValue(result);
    expect(await controller.getImagemById(1)).toEqual(result);
  });

  it('should create imagem', async () => {
    const dto = { sala: 1, imagem: Buffer.from('img'), nomeArquivo: 'foto.png', tipoMime: 'image/png' };
    const result = { id: 1, ...dto };
    mockService.createImagem.mockResolvedValue(result);
    expect(await controller.createImagem(dto)).toEqual(result);
  });

  it('should delete imagem', async () => {
    mockService.deleteImagem.mockResolvedValue(undefined);
    await expect(controller.deleteImagem(1)).resolves.toBeUndefined();
  });
});
