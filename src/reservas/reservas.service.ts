import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { Reservas } from "./reservas.entity";
import { ReservasInterface } from "./interfaces/reservas.interface";

@Injectable()
export class ReservasService {
    constructor(@Inject('RESERVAS_REPOSITORY') 
    private reservasRepository: Repository<Reservas>) {}

    async getReservas(): Promise<Reservas[]> {
        return await this.reservasRepository.find();
      }
    
      async createReserva(data: ReservasInterface): Promise<Reservas> {
        const reserva = this.reservasRepository.create(data);
        return await this.reservasRepository.save(reserva);
      }
    
      async updateReserva(id: number, data: Partial<ReservasInterface>): Promise<Reservas> {
        const reserva = await this.reservasRepository.findOne({ where: { id } });
        if (!reserva) throw new NotFoundException('Reserva não encontrada');
    
        Object.assign(reserva, data);
        return await this.reservasRepository.save(reserva);
      }
    
      async deleteReserva(id: number): Promise<void> {
        const result = await this.reservasRepository.delete(id);
        if (result.affected === 0) {
          throw new NotFoundException('Reserva não encontrada');
        }
      }
    }
    