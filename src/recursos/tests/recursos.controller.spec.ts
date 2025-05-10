
import { Test, TestingModule } from '@nestjs/testing';
import { RecursosController } from '../recursos.controller';
import { RecursosService } from '../recursos.service';

describe('RecursosController', () => {
  let controller: RecursosController;
  let service: RecursosService;

  const mockService = {
    getRecursos: jest.fn(),
    createRecurso: jest.fn(),
    updateRecurso: jest.fn(),
    deleteRecurso: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecursosController],
      providers: [
        {
          provide: RecursosService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<RecursosController>(RecursosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all recursos', async () => {
    const result = [{ id: 1, nome: 'Projetor' }];
    mockService.getRecursos.mockResolvedValue(result);
    expect(await controller.getRecursos()).toEqual(result);
  });

  it('should create a recurso', async () => {
    const dto = { nome: 'Microfone' };
    const result = { id: 2, nome: 'Microfone' };
    mockService.createRecurso.mockResolvedValue(result);
    expect(await controller.createRecurso(dto)).toEqual(result);
  });

  it('should update a recurso', async () => {
    const dto = { nome: 'Projetor HD' };
    const result = { id: 1, nome: 'Projetor HD' };
    mockService.updateRecurso.mockResolvedValue(result);
    expect(await controller.updateRecurso(1, dto)).toEqual(result);
  });

  it('should delete a recurso', async () => {
    mockService.deleteRecurso.mockResolvedValue(undefined);
    await expect(controller.deleteRecurso(1)).resolves.toBeUndefined();
  });
});
