import { DataSource } from 'typeorm';
import { SalasRecursos } from './salasRecursos.entity';

export const salasRecursosProviders = [
    {
        provide: 'SALASRECURSOS_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(SalasRecursos),
        inject: ['DATA_SOURCE'],
    },
];
