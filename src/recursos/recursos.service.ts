import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { Recursos } from "./recursos.entity";

@Injectable()
export class RecursosService {
    constructor(
        @Inject('RECURSOS_REPOSITORY')
        private recursosRepository: Repository<Recursos>
    ) {}

    getRecursos(): Promise<Recursos[]> {
        return this.recursosRepository.find();
    }

    async createRecurso(data: { nome: string }): Promise<Recursos> {
        if (!data || !data.nome) {
            throw new BadRequestException('Nome do recurso é obrigatório para criação');
        }

        const recurso = this.recursosRepository.create(data);
        return this.recursosRepository.save(recurso);
    }

    async updateRecurso(id: number, data: Partial<Recursos>): Promise<Recursos> {
        const recurso = await this.recursosRepository.findOne({ where: { id } });
        if (!recurso) {
            throw new NotFoundException(`Recurso com ID ${id} não encontrado`);
        }

        if (!data || Object.keys(data).length === 0) {
            throw new BadRequestException('Dados para atualização não informados');
        }

        Object.assign(recurso, data);
        return this.recursosRepository.save(recurso);
    }

    async deleteRecurso(id: number): Promise<void> {
        const result = await this.recursosRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Recurso com ID ${id} não encontrado`);
        }
    }
}
