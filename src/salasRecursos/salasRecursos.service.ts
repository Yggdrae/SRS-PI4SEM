import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { SalasRecursos } from "./salasRecursos.entity";
import { SalasRecursosInterface } from "./interfaces/salasRecursos.interface";

@Injectable()
export class SalasRecursosService {
    constructor(
        @Inject('SALASRECURSOS_REPOSITORY')
        private salasRecursosRepository: Repository<SalasRecursos>
    ) { }

    async getSalasRecursos(): Promise<SalasRecursos[]> {
        return await this.salasRecursosRepository.find();
    }

    async createSalasRecursos(data: SalasRecursosInterface): Promise<SalasRecursos> {
        if (!data || !data.sala || !data.recurso || data.quantidade === undefined) {
            throw new BadRequestException('Dados obrigatórios (sala, recurso e quantidade) devem ser informados');
        }

        const entity = this.salasRecursosRepository.create(data);
        return await this.salasRecursosRepository.save(entity);
    }

    async updateSalasRecursos(id: number, data: Partial<SalasRecursosInterface>): Promise<SalasRecursos> {
        const entity = await this.salasRecursosRepository.findOne({ where: { id } });
        if (!entity) {
            throw new NotFoundException(`SalaRecurso com ID ${id} não encontrada`);
        }

        if (!data || Object.keys(data).length === 0) {
            throw new BadRequestException('Dados para atualização não informados');
        }

        Object.assign(entity, data);
        return await this.salasRecursosRepository.save(entity);
    }

    async deleteSalasRecursos(id: number): Promise<void> {
        const result = await this.salasRecursosRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`SalaRecurso com ID ${id} não encontrada`);
        }
    }
}