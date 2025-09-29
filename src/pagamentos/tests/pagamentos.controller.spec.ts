
import { Test, TestingModule } from '@nestjs/testing';
import { PagamentosController } from '../../pagamentos/pagamentos.controller';
import { PagamentosService } from '../../pagamentos/pagamentos.service';
import { CreatePagamentoDTO } from '../dto/create-pagamento.dto';

describe('PagamentosController', () => {
  let controller: PagamentosController;
  let service: PagamentosService;

  const mockService = {
    processarPagamento: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PagamentosController],
      providers: [
        {
          provide: PagamentosService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<PagamentosController>(PagamentosController);
    service = module.get<PagamentosService>(PagamentosService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should process a payment', async () => {
    const dto: CreatePagamentoDTO = {
      valor: 100,
      metodo: 'cartao',
      usuarioId: 1,
      cartaoId: 123,
    };

    const result = {
      status: 'aprovado',
      transacaoId: 'txn_abc123',
      valor: dto.valor,
      metodo: dto.metodo,
      timestamp: new Date(),
    };

    mockService.processarPagamento.mockResolvedValue(result);

    expect(await controller.pagar(dto)).toEqual(result);
  });
});
