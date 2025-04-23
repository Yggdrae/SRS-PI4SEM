import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { SalasRecursos } from "./salasRecursos.entity";
import { SalasRecursosInterface } from "./interfaces/salasRecursos.interface";

@Injectable()
export class SalasRecursosService {
    constructor(
    @Inject('SALASRECURSOS_REPOSITORY')
    private salasRecursosRepository: Repository<SalasRecursos>) {}

    async getSalasRecursos(): Promise<SalasRecursos[]> {
        return await this.salasRecursosRepository.find();
    }

    async createSalasRecursos(data: SalasRecursosInterface): Promise<SalasRecursos> {
        const entity = this.salasRecursosRepository.create(data);
        return await this.salasRecursosRepository.save(entity);
    }

    async updateSalasRecursos(id: number, data: Partial<SalasRecursosInterface>): Promise<SalasRecursos> {
        const entity = await this.salasRecursosRepository.findOne({ where: { id } });
        if (!entity) throw new NotFoundException("SalaRecurso não encontrada");
        Object.assign(entity, data);
        return await this.salasRecursosRepository.save(entity);
    }

    async deleteSalasRecursos(id: number): Promise<void> {
        const result = await this.salasRecursosRepository.delete(id);
        if (result.affected === 0) throw new NotFoundException("SalaRecurso não encontrada");
    }
}
