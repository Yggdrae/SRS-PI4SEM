import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Reservas } from 'src/reservas/reservas.entity';
import { LessThan, Repository } from 'typeorm';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    @Inject('RESERVAS_REPOSITORY')
    private readonly reservaRepository: Repository<Reservas>,
  ) {}

  @Cron('1 * * * *')
  async finalizarReservas() {
    this.logger.log('Verificando reservas...');

    try {
      await this.reservaRepository.update(
        {
          status: 'Confirmada',
          diaHoraFim: LessThan(new Date()),
        },
        {
          status: 'Concluída',
        },
      );
    } catch (error) {
      this.logger.error(error);
    }
  }
}
