import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ExcecoesDisponibilidade } from './excecoesDisponibilidade.entity';
import { ExcecoesDisponibilidadeInterface } from './interfaces/excecoesDisponibilidade.interface';
import { Salas } from 'src/salas/salas.entity';

@Injectable()
export class ExcecoesDisponibilidadeService {
    constructor(
        @Inject('EXCECOESDISPONIBILIDADE_REPOSITORY')
        private repository: Repository<ExcecoesDisponibilidade>,

        @Inject('SALAS_REPOSITORY')
        private salasRepository: Repository<Salas>,
    ) { }

    async create(data: ExcecoesDisponibilidadeInterface): Promise<ExcecoesDisponibilidade> {
        const sala = await this.salasRepository.findOne({ where: { id: data.salaId } });
        if (!sala) throw new NotFoundException('Sala não encontrada');

        const excecao = this.repository.create({
            sala,
            data: data.data,
            indisponivel: data.indisponivel,
            motivo: data.motivo,
            horarioInicio: data.horarioInicio,
            horarioFim: data.horarioFim,
        });
                
        return await this.repository.save(excecao);
    }

    async findAll(): Promise<ExcecoesDisponibilidade[]> {
        return this.repository.find({ relations: ['sala'] });
    }

    async delete(id: number): Promise<void> {
        const result = await this.repository.delete(id);
        if (result.affected === 0) throw new NotFoundException('Exceção não encontrada');
    }
}
