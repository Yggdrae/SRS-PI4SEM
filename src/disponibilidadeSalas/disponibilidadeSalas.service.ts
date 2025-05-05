import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, Between } from 'typeorm';
import { DisponibilidadeSalas } from './disponibilidadeSalas.entity';
import { DisponibilidadeSalasInterface } from './interfaces/disponibilidadeSalas.interface';
import { ExcecoesDisponibilidade } from 'src/excecoesDisponibilidade/excecoesDisponibilidade.entity';
import { Salas } from 'src/salas/salas.entity';
import { Reservas } from 'src/reservas/reservas.entity'

@Injectable()
export class DisponibilidadeSalasService {
    constructor(
        @Inject('DISPONIBILIDADESALAS_REPOSITORY')
        private disponibilidadeRepository: Repository<DisponibilidadeSalas>,
        @Inject('SALAS_REPOSITORY')
        private salasRepository: Repository<Salas>,
        @Inject('EXCECOESDISPONIBILIDADE_REPOSITORY')
        private excecoesRepository: Repository<ExcecoesDisponibilidade>,
        @Inject('RESERVAS_REPOSITORY')
        private reservasRepository: Repository<Reservas>,
    ) { }

    private convertTimeToDate(time: string | Date, date: Date): Date {
        if (time instanceof Date) {
            return time;
        }

        const [hours, minutes] = time.split(':').map(Number);

        // Criar nova data com o mesmo ano/mês/dia, e horário fixado
        return new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            hours,
            minutes,
            0,
            0
        );
    }

    async getHorarioReal(salaId: number, data: string): Promise<{ horarioInicio: string, horarioFim: string }[] | null> {
        const sala = await this.salasRepository.findOne({ where: { id: salaId } });
        if (!sala) throw new NotFoundException('Sala não encontrada');

        // Verificar se existe exceção para essa data
        const excecao = await this.excecoesRepository.findOne({
            where: { sala: { id: salaId }, data },
        });

        if (excecao) {
            if (excecao.indisponivel) return null;
            return [{
                horarioInicio: excecao.horarioInicio,
                horarioFim: excecao.horarioFim,
            }];
        }

        const diaDaSemana = new Date(data).getDay() + 1;  // Domingo = 1, Segunda = 2 ...

        // Buscar as disponibilidades para a sala no dia da semana
        const disponibilidade = await this.disponibilidadeRepository.find({
            where: {
                sala: { id: salaId },
                diaDaSemana,
            },
        });

        // Buscar as reservas para a sala nesse dia
        const reservas = await this.reservasRepository.find({
            where: {
                sala: sala,  // Passa a entidade sala completa
            },
            relations: ['horario'],
        });

        // Mapear as reservas para os horários de início e fim
        const horariosReservados = reservas.map(r => ({
            inicio: this.convertTimeToDate(r.horario.diaHoraInicio, new Date(data)),
            fim: this.convertTimeToDate(r.horario.diaHoraFim, new Date(data)),
        }));

        // Divide os horários disponíveis de acordo com as reservas
        const horariosDisponiveis: { horarioInicio: string, horarioFim: string }[] = [];

        // Para cada disponibilidade, verificar se está ocupado
        for (let d of disponibilidade) {
            let inicioDisponivel = this.convertTimeToDate(d.horarioInicio, new Date(data));
            const fimDisponivel = this.convertTimeToDate(d.horarioFim, new Date(data));

            // Ordenar as reservas pelo horário de início
            const reservasOrdenadas = horariosReservados
                .filter(r => r.inicio < fimDisponivel && r.fim > inicioDisponivel) // apenas interseções
                .sort((a, b) => a.inicio.getTime() - b.inicio.getTime());

            // Verificar se a disponibilidade está ocupada por algum horário reservado
            for (const reserva of reservasOrdenadas) {
                if (reserva.inicio > inicioDisponivel) {
                    // Intervalo disponível antes da reserva
                    horariosDisponiveis.push({
                        horarioInicio: `${inicioDisponivel.getHours().toString().padStart(2, '0')}:${inicioDisponivel.getMinutes().toString().padStart(2, '0')}`,
                        horarioFim: `${reserva.inicio.getHours().toString().padStart(2, '0')}:${reserva.inicio.getMinutes().toString().padStart(2, '0')}`,
                    });
                }

                // Atualiza início para depois da reserva (máximo para evitar retrocessos)
                inicioDisponivel = new Date(Math.max(inicioDisponivel.getTime(), reserva.fim.getTime()));
            }

            // Se sobrou um horário disponível depois da última reserva
            if (inicioDisponivel < fimDisponivel) {
                horariosDisponiveis.push({
                    horarioInicio: `${inicioDisponivel.getHours().toString().padStart(2, '0')}:${inicioDisponivel.getMinutes().toString().padStart(2, '0')}`,
                    horarioFim: `${fimDisponivel.getHours().toString().padStart(2, '0')}:${fimDisponivel.getMinutes().toString().padStart(2, '0')}`,
                });
            }
        }

        return horariosDisponiveis;
    }

    async findAll(): Promise<DisponibilidadeSalas[]> {
        return this.disponibilidadeRepository.find({ relations: ['sala'] });
    }

    async create(data: DisponibilidadeSalasInterface): Promise<DisponibilidadeSalas> {
        const sala = await this.salasRepository.findOne({ where: { id: data.salaId } });
        if (!sala) throw new NotFoundException('Sala não encontrada');

        const novaDisponibilidade = this.disponibilidadeRepository.create({
            sala,
            diaDaSemana: data.diaDaSemana,
            horarioInicio: data.horarioInicio,
            horarioFim: data.horarioFim,
        });

        return await this.disponibilidadeRepository.save(novaDisponibilidade);
    }

    async delete(id: number): Promise<void> {
        const result = await this.disponibilidadeRepository.delete(id);
        if (result.affected === 0) throw new NotFoundException('Disponibilidade não encontrada');
    }
}
