import { DataSource } from 'typeorm';
import { Reservas } from './reservas.entity';
import { HorariosSalas } from "src/horariosSalas/horariosSalas.entity";

export const reservasProviders = [
    {
      provide: 'RESERVAS_REPOSITORY',
      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(Reservas),
      inject: ['DATA_SOURCE'],
    },
    {
      provide: 'HORARIOS_SALAS_REPOSITORY',
      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(HorariosSalas),
      inject: ['DATA_SOURCE'],
    },
  ];
  