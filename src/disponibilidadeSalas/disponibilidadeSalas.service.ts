import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository, Between, In } from 'typeorm';
import { DisponibilidadeSalas } from './disponibilidadeSalas.entity';
import { DisponibilidadeSalasInterface } from './interfaces/disponibilidadeSalas.interface';
import { ExcecoesDisponibilidade } from 'src/excecoesDisponibilidade/excecoesDisponibilidade.entity';
import { Salas } from 'src/salas/salas.entity';
import { Reservas } from 'src/reservas/reservas.entity';
import { CreateDisponibilidadeSalasDTO } from './dto/disponibilidadeSalas.dto';

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
  ) {}

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
      0,
    );
  }

  async getHorarioReal(
    salaId: number,
    data: string,
  ): Promise<{ horarioInicio: string; horarioFim: string }[] | null> {
    const sala = await this.salasRepository.findOne({ where: { id: salaId } });
    if (!sala) throw new NotFoundException('Sala não encontrada');

    const [ano, mes, diaStr] = data.split('-').map(Number);
    const dia = new Date(ano, mes - 1, diaStr);
    const diaInicio = new Date(Date.UTC(ano, mes - 1, diaStr, 0, 0, 0));
    const diaFim = new Date(Date.UTC(ano, mes - 1, diaStr, 23, 59, 59, 999));
    diaFim.setHours(23, 59, 59, 999);

    // Buscar reservas da sala nesse dia
    const reservas = await this.reservasRepository.find({
      where: {
        sala: { id: salaId },
        diaHoraInicio: Between(diaInicio, diaFim),
        status: In(['Ativa', 'Confirmada']),
      },
    });

    const horariosReservados = reservas.map((r) => ({
      inicio: new Date(r.diaHoraInicio),
      fim: new Date(r.diaHoraFim),
    }));

    const dataFormatada = data.slice(0, 10);

    // Verifica se existe exceção para essa data
    const excecao = await this.excecoesRepository.findOne({
      where: { sala: { id: salaId }, data: dataFormatada },
    });

    if (excecao) {
      if (excecao.indisponivel) return null;

      const inicioExcecao = this.convertTimeToDate(excecao.horarioInicio, dia);
      const fimExcecao = this.convertTimeToDate(excecao.horarioFim, dia);

      return this.calcularDisponibilidade(
        inicioExcecao,
        fimExcecao,
        horariosReservados,
      );
    }

    // Se não houver exceção, usa disponibilidade padrão do dia da semana
    const diaDaSemana = dia.getDay() + 1;
    const disponibilidades = await this.disponibilidadeRepository.find({
      where: { sala: { id: salaId }, diaDaSemana },
    });

    const horariosDisponiveis: { horarioInicio: string; horarioFim: string }[] =
      [];

    for (const d of disponibilidades) {
      const inicio = this.convertTimeToDate(d.horarioInicio, dia);
      const fim = this.convertTimeToDate(d.horarioFim, dia);
      const partes = this.calcularDisponibilidade(
        inicio,
        fim,
        horariosReservados,
      );
      horariosDisponiveis.push(...partes);
    }

    return horariosDisponiveis;
  }

  private calcularDisponibilidade(
    inicio: Date,
    fim: Date,
    reservas: { inicio: Date; fim: Date }[],
  ): { horarioInicio: string; horarioFim: string }[] {
    const resultado: { horarioInicio: string; horarioFim: string }[] = [];

    const reservasOrdenadas = reservas
      .filter((r) => r.inicio < fim && r.fim > inicio)
      .sort((a, b) => a.inicio.getTime() - b.inicio.getTime());

    let inicioDisponivel = new Date(inicio);

    for (const reserva of reservasOrdenadas) {
      if (reserva.inicio > inicioDisponivel) {
        resultado.push({
          horarioInicio: this.formatarHora(inicioDisponivel),
          horarioFim: this.formatarHora(reserva.inicio),
        });
      }
      inicioDisponivel = new Date(
        Math.max(inicioDisponivel.getTime(), reserva.fim.getTime()),
      );
    }

    if (inicioDisponivel < fim) {
      resultado.push({
        horarioInicio: this.formatarHora(inicioDisponivel),
        horarioFim: this.formatarHora(fim),
      });
    }

    return resultado;
  }

  private formatarHora(date: Date): string {
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  }

  async findAll(): Promise<DisponibilidadeSalas[]> {
    return this.disponibilidadeRepository.find({ relations: ['sala'] });
  }

  async create(
    data: DisponibilidadeSalasInterface,
  ): Promise<DisponibilidadeSalas> {
    const sala = await this.salasRepository.findOne({
      where: { id: data.salaId },
    });
    if (!sala) throw new NotFoundException('Sala não encontrada');

    const conflito = await this.disponibilidadeRepository
      .createQueryBuilder('d')
      .where('d.salaId = :salaId', { salaId: data.salaId })
      .andWhere('d.diaDaSemana = :diaDaSemana', {
        diaDaSemana: data.diaDaSemana,
      })
      .andWhere('(:inicio < d.horarioFim AND :fim > d.horarioInicio)', {
        inicio: data.horarioInicio,
        fim: data.horarioFim,
      })
      .getOne();

    if (conflito) {
      throw new BadRequestException(
        'Já existe uma disponibilidade nesse intervalo ou com sobreposição.',
      );
    }

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
    if (result.affected === 0)
      throw new NotFoundException('Disponibilidade não encontrada');
  }

  async getPorSala(salaId: number): Promise<DisponibilidadeSalas[]> {
    const sala = await this.salasRepository.findOne({ where: { id: salaId } });
    if (!sala) throw new NotFoundException('Sala não encontrada');

    return await this.disponibilidadeRepository.find({
      where: { sala: { id: salaId } },
    });
  }

  async upsertDisponibilidades(
    data: CreateDisponibilidadeSalasDTO[],
  ): Promise<DisponibilidadeSalas[]> {
    if (!data.length) return [];

    const salaId = data[0].salaId;

    const sala = await this.salasRepository.findOne({ where: { id: salaId } });
    if (!sala)
      throw new NotFoundException(`Sala com ID ${salaId} não encontrada`);

    await this.disponibilidadeRepository.delete({ sala: { id: salaId } });

    const result: DisponibilidadeSalas[] = [];
    for (const item of data) {
      const nova = this.disponibilidadeRepository.create({
        sala,
        diaDaSemana: item.diaDaSemana,
        horarioInicio: item.horarioInicio,
        horarioFim: item.horarioFim,
      });

      const salva = await this.disponibilidadeRepository.save(nova);
      result.push(salva);
    }

    return result;
  }

  async updatePorSala(
    salaId: number,
    data: CreateDisponibilidadeSalasDTO[],
  ): Promise<DisponibilidadeSalas[]> {
    const sala = await this.salasRepository.findOne({ where: { id: salaId } });
    if (!sala) throw new NotFoundException('Sala não encontrada');

    await this.disponibilidadeRepository.delete({ sala: { id: salaId } });

    const novasDisponibilidades = data.map((item) =>
      this.disponibilidadeRepository.create({
        sala,
        diaDaSemana: item.diaDaSemana,
        horarioInicio: item.horarioInicio,
        horarioFim: item.horarioFim,
      }),
    );

    return await this.disponibilidadeRepository.save(novasDisponibilidades);
  }
}
