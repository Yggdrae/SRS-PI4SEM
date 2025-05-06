import { Module } from '@nestjs/common';
import { disponibilidadeSalasProviders } from './disponibilidadeSalas.providers';
import { DisponibilidadeSalasService } from './disponibilidadeSalas.service';
import { DisponibilidadeSalasController } from './disponibilidadeSalas.controller';
import { DatabaseModule } from 'src/db/database.module';
import { salasProviders } from 'src/salas/salas.providers';
import { DisponibilidadeSalas } from './disponibilidadeSalas.entity';
import { Salas } from 'src/salas/salas.entity';
import { Reservas } from 'src/reservas/reservas.entity';
import { ExcecoesDisponibilidade } from 'src/excecoesDisponibilidade/excecoesDisponibilidade.entity';
import { DataSource } from 'typeorm';




@Module({
    imports: [DatabaseModule], // <-- Adicione esta linha
    controllers: [DisponibilidadeSalasController],
    providers: [
      DisponibilidadeSalasService,
      {
        provide: 'DISPONIBILIDADESALAS_REPOSITORY',
        useFactory: (dataSource: DataSource) =>
          dataSource.getRepository(DisponibilidadeSalas),
        inject: ['DATA_SOURCE'],
      },
      {
        provide: 'SALAS_REPOSITORY',
        useFactory: (dataSource: DataSource) =>
          dataSource.getRepository(Salas),
        inject: ['DATA_SOURCE'],
      },
      {
        provide: 'RESERVAS_REPOSITORY',
        useFactory: (dataSource: DataSource) =>
          dataSource.getRepository(Reservas),
        inject: ['DATA_SOURCE'],
      },
      {
        provide: 'EXCECOESDISPONIBILIDADE_REPOSITORY',
        useFactory: (dataSource: DataSource) =>
          dataSource.getRepository(ExcecoesDisponibilidade),
        inject: ['DATA_SOURCE'],
      },
    ],
  })
  export class DisponibilidadeSalasModule {}
  