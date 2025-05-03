import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { Reservas } from "./reservas.entity";
import { ReservasInterface } from "./interfaces/reservas.interface";
import { HorariosSalas } from "src/horariosSalas/horariosSalas.entity";

@Injectable()
export class ReservasService {
  constructor(
    @Inject('RESERVAS_REPOSITORY')
    private reservasRepository: Repository<Reservas>,

    @Inject('HORARIOS_SALAS_REPOSITORY')
    private horariosRepository: Repository<HorariosSalas>
  ) { }

  async getReservas(): Promise<Reservas[]> {
    return await this.reservasRepository.find();
  }

  async getReservasFull(): Promise<Reservas[]> {
    return await this.reservasRepository.find({
      relations: ['horario'],
    });
  }  

  async createReserva(data: ReservasInterface): Promise<Reservas> {
    const horario = await this.horariosRepository.findOneBy(data.horario);
    if (!horario) throw new BadRequestException('Horário não encontrado');

    const reserva = this.reservasRepository.create({
      ...data,
      horario
    });

    return await this.reservasRepository.save(reserva);
  }

  async updateReserva(id: number, data: Partial<ReservasInterface>): Promise<Reservas> {
    const reserva = await this.reservasRepository.findOne({ where: { id } });
    if (!reserva) {
      throw new NotFoundException(`Reserva com ID ${id} não encontrada`);
    }

    if (!data || Object.keys(data).length === 0) {
      throw new BadRequestException('Dados para atualização não informados');
    }

    Object.assign(reserva, data);
    return await this.reservasRepository.save(reserva);
  }

  async deleteReserva(id: number): Promise<void> {
    const result = await this.reservasRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Reserva com ID ${id} não encontrada`);
    }
  }
}
