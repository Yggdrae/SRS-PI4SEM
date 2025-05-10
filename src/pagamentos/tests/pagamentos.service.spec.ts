
import { Test, TestingModule } from '@nestjs/testing';
import { PagamentosService } from '../../pagamentos/pagamentos.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Cartao } from 'src/cartoes/cartoes.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('PagamentosService', () => {
  let service: PagamentosService;

  const mockCartoesRepository = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PagamentosService,
        {
          provide: 'CARTOES_REPOSITORY',
          useValue: mockCartoesRepository,
        },
      ],
    }).compile();

    service = module.get<PagamentosService>(PagamentosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw if cartaoId is not provided', async () => {
    await expect(
      service.processarPagamento({ valor: 100, metodo: 'cartao', usuarioId: 1 })
    ).rejects.toThrow(BadRequestException);
  });

  it('should throw if cartao is not found', async () => {
    mockCartoesRepository.findOne.mockResolvedValue(null);

    await expect(
      service.processarPagamento({ valor: 100, metodo: 'cartao', usuarioId: 1, cartaoId: 99 })
    ).rejects.toThrow(NotFoundException);
  });

  it('should return payment result if cartao is found', async () => {
    mockCartoesRepository.findOne.mockResolvedValue({ id: 1 });

    const dto = { valor: 100, metodo: 'cartao', usuarioId: 1, cartaoId: 1 };
    const result = await service.processarPagamento(dto);

    expect(result).toHaveProperty('status');
    expect(result).toHaveProperty('transacaoId');
  });
});
