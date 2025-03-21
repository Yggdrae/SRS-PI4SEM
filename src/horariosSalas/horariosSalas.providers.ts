import { DataSource } from 'typeorm';
import { HorariosSalas } from './horariosSalas.entity';

export const horariosSalasProviders = [
    {
        provide: 'HORARIOSSALAS_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(HorariosSalas),
        inject: ['DATA_SOURCE'],
    },
];
