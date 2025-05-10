import { Inject, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreatePagamentoDTO } from './dto/create-pagamento.dto';
import { Repository } from 'typeorm';
import { Cartao } from 'src/cartoes/cartoes.entity';

@Injectable()
export class PagamentosService {
    constructor(
        @Inject('CARTOES_REPOSITORY')
        private cartoesRepository: Repository<Cartao>,
    ) { }

    async processarPagamento(dto: CreatePagamentoDTO) {
        if (!dto.cartaoId) {
            throw new BadRequestException('Cartão obrigatório para pagamento com cartão');
        }

        const cartao = await this.cartoesRepository.findOne({
            where: {
                id: dto.cartaoId,
                usuario: { id: dto.usuarioId },
            },
            relations: ['usuario'],
        });

        if (!cartao) {
            throw new NotFoundException('Cartão não encontrado para o usuário informado');
        }

        // Lógica mock de aprovação
        const aprovado = Math.random() < 0.9;

        return {
            status: aprovado ? 'aprovado' : 'recusado',
            transacaoId: 'txn_' + Math.random().toString(36).substring(2, 15),
            valor: dto.valor,
            metodo: dto.metodo,
            timestamp: new Date(),
        };
    }
}
