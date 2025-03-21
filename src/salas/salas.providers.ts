import { DataSource } from 'typeorm';
import { Salas } from './salas.entity';

export const salasProviders = [
    {
        provide: 'SALAS_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Salas),
        inject: ['DATA_SOURCE'],
    },
];
