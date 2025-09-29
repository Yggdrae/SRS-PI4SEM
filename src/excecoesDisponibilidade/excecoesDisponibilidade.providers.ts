import { DataSource } from 'typeorm';
import { ExcecoesDisponibilidade } from './excecoesDisponibilidade.entity';

export const excecoesDisponibilidadeProviders = [
    {
        provide: 'EXCECOESDISPONIBILIDADE_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(ExcecoesDisponibilidade),
        inject: ['DATA_SOURCE'],
    },
];