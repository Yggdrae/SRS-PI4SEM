import { Reservas } from 'src/reservas/reservas.entity';
import { DataSource } from 'typeorm';

export const tasksProviders = [
    {
        provide: 'RESERVAS_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Reservas),
        inject: ['DATA_SOURCE'],
    },
];
