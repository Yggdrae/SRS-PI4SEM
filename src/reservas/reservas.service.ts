import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { Reservas } from "./reservas.entity";
import { Usuario } from 'src/usuarios/usuarios.entity';
import { Salas } from 'src/salas/salas.entity';
import { ReservasInterface } from "./interfaces/reservas.interface";

@Injectable()
export class ReservasService {
  constructor(

    @Inject('USUARIOS_REPOSITORY')
    private usuariosRepository: Repository<Usuario>,

    @Inject('SALAS_REPOSITORY')
    private salasRepository: Repository<Salas>,

    @Inject('RESERVAS_REPOSITORY')
    private reservasRepository: Repository<Reservas>,
  ) { }

  async getReservas(): Promise<Reservas[]> {
    return await this.reservasRepository.find();
  }

  async getReservasFull(): Promise<Reservas[]> {
    return await this.reservasRepository.find({
      relations: ['usuario', 'sala'],
    });
  }

  async createReserva(data: ReservasInterface): Promise<Reservas> {

    // Buscar a entidade Usuario pelo ID
    const usuario = await this.usuariosRepository.findOne({ where: { id: data.usuario } });
    if (!usuario) throw new BadRequestException('Usuário não encontrado');

    // Buscar a entidade Salas pelo ID
    const sala = await this.salasRepository.findOne({ where: { id: data.sala } });
    if (!sala) throw new BadRequestException('Sala não encontrada');

    // Criar a reserva associando as entidades encontradas
    const reserva = this.reservasRepository.create({
      usuario,
      sala,
      diaHoraInicio: data.diaHoraInicio,
      diaHoraFim: data.diaHoraFim,
      status: data.status,
      motivoCancelamento: data.motivoCancelamento,
    });

    // Salvar a reserva no banco de dados
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

    if (data.diaHoraInicio) reserva.diaHoraInicio = data.diaHoraInicio;
    if (data.diaHoraFim) reserva.diaHoraFim = data.diaHoraFim;
    if (data.status) reserva.status = data.status;
    if (data.motivoCancelamento !== undefined) reserva.motivoCancelamento = data.motivoCancelamento;



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
