import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { HorariosSalas } from "./horariosSalas.entity";
import { HorariosSalasInterface } from "./interfaces/horariosSalas.interface";

@Injectable()
export class HorariosSalasService {
    constructor(
        @Inject('HORARIOSSALAS_REPOSITORY')
        private horariosSalasRepository: Repository<HorariosSalas>
    ) { }

    async getHorariosSalas(): Promise<HorariosSalas[]> {
        return await this.horariosSalasRepository.find({
            relations: ['sala'],
        });
    }

    async createHorarioSala(data: HorariosSalasInterface): Promise<HorariosSalas> {
        const { sala, diaHoraInicio, diaHoraFim } = data;

        const reservaExistente = await this.horariosSalasRepository.createQueryBuilder('horario')
            .where('horario.sala = :sala', { sala })
            .andWhere(
                '(horario.diaHoraInicio < :diaHoraFim AND horario.diaHoraFim > :diaHoraInicio)',
                { diaHoraInicio, diaHoraFim }
            )
            .getOne();

        if (reservaExistente) {
            throw new BadRequestException('Já existe uma reserva para esta sala no horário solicitado');
        }

        const horario = this.horariosSalasRepository.create({
            sala: { id: data.sala },
            diaHoraInicio,
            diaHoraFim,
        });
        return await this.horariosSalasRepository.save(horario);
    }

    async updateHorarioSala(id: number, data: Partial<HorariosSalasInterface>): Promise<HorariosSalas> {
        const horario = await this.horariosSalasRepository.findOne({ where: { id } });

        if (!horario) {
            throw new NotFoundException(`Horário de sala com ID ${id} não encontrado`);
        }

        if (!data || Object.keys(data).length === 0) {
            throw new BadRequestException('Nenhum dado informado para atualização');
        }

        if (data.sala) {
            horario.sala = { id: data.sala } as any;
        }
        if (data.diaHoraInicio) {
            horario.diaHoraInicio = data.diaHoraInicio;
        }
        if (data.diaHoraFim) {
            horario.diaHoraFim = data.diaHoraFim;
        }

        return await this.horariosSalasRepository.save(horario);
    }

    async deleteHorarioSala(id: number): Promise<void> {
        const result = await this.horariosSalasRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Horário de sala com ID ${id} não encontrado para exclusão`);
        }
    }

    async getHorariosPorSala(salaId: number): Promise<HorariosSalas[]> {
        const horarios = await this.horariosSalasRepository.find({
            where: { sala: { id: salaId } },
            relations: ['sala'],
        });

        if (horarios.length === 0) {
            throw new NotFoundException(`Nenhum horário encontrado para a sala com ID ${salaId}`);
        }

        return horarios;
    }

}
