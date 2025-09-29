import { DataSource } from 'typeorm';
import { Recursos } from './recursos.entity';

export const recursosProviders = [
    {
        provide: 'RECURSOS_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Recursos),
        inject: ['DATA_SOURCE'],
    },
];
