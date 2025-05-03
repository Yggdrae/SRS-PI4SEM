import { DataSource } from 'typeorm';
import { DisponibilidadeSalas } from './disponibilidadeSalas.entity';

export const disponibilidadeSalasProviders = [
    {
        provide: 'DISPONIBILIDADESALAS_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(DisponibilidadeSalas),
        inject: ['DATA_SOURCE'],
    },
];
