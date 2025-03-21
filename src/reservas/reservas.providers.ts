import { DataSource } from 'typeorm';
import { Reservas } from './reservas.entity';

export const reservasProviders = [
    {
        provide: 'RESERVAS_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Reservas),
        inject: ['DATA_SOURCE'],
    },
];
