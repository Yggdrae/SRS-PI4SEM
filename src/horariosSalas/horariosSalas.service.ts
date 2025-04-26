import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { HorariosSalas } from "./horariosSalas.entity";
import { HorariosSalasInterface } from "./interfaces/horariosSalas.interface";

@Injectable()
export class HorariosSalasService {
    constructor(
        @Inject('HORARIOSSALAS_REPOSITORY') 
        private horariosSalasRepository: Repository<HorariosSalas>
    ) {}

    async getHorariosSalas(): Promise<HorariosSalas[]> {
        return await this.horariosSalasRepository.find({
            relations: ['sala'],
        });
    }

    async createHorarioSala(data: HorariosSalasInterface): Promise<HorariosSalas> {
        const horario = this.horariosSalasRepository.create(data);
        return await this.horariosSalasRepository.save(horario);
    }

    async updateHorarioSala(id: number, data: Partial<HorariosSalasInterface>): Promise<HorariosSalas> {
        const horario = await this.horariosSalasRepository.findOne({ where: { id } });
        if (!horario) throw new NotFoundException("Horário de sala não encontrado");

        Object.assign(horario, data);
        return await this.horariosSalasRepository.save(horario);
    }

    async deleteHorarioSala(id: number): Promise<void> {
        const result = await this.horariosSalasRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException("Horário de sala não encontrado");
        }
    }

    async getHorariosPorSala(salaId: number): Promise<HorariosSalas[]> {
        return this.horariosSalasRepository.find({
          where: { sala: salaId },
          relations: ['sala'],
        });
    }
      
}
