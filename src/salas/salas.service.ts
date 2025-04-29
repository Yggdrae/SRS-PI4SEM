import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { Salas } from "./salas.entity";
import { SalasInterface } from "./interfaces/salas.interface";

@Injectable()
export class SalasService {
    constructor(
        @Inject('SALAS_REPOSITORY')
        private salasRepository: Repository<Salas>
    ) { }

    async getSalas(): Promise<Salas[]> {
        return await this.salasRepository.find();
    }

    async createSalas(data: SalasInterface): Promise<Salas> {
        if (!data.numero || !data.andar || data.valorHora === undefined) {
            throw new BadRequestException('Dados obrigatórios (número, andar, valorHora) não fornecidos');
        }
        const sala = this.salasRepository.create(data);
        return await this.salasRepository.save(sala);

    }

    async updateSalas(id: number, data: Partial<SalasInterface>): Promise<Salas> {
        const sala = await this.salasRepository.findOne({ where: { id } });
        if (!sala) {
            throw new NotFoundException(`Sala com ID ${id} não encontrada`);
        }

        if (!data || Object.keys(data).length === 0) {
            throw new BadRequestException('Dados para atualização não informados')
        }

        Object.assign(sala, data);
        return await this.salasRepository.save(sala);
    }

    async deleteSalas(id: number): Promise<void> {
        const result = await this.salasRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Sala com ID ${id} não encontrada para exclusão`);
        }
    }

    async getSalasDestaque(): Promise<Salas[]> {
        return await this.salasRepository.find({
            where: { isDestaque: true },
        });
    }

}
