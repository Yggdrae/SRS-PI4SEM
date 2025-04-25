import { DataSource } from 'typeorm';
import { SalasImagens } from './salasImagens.entity';

export const salasImagensProviders = [
  {
    provide: 'SALASIMAGENS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(SalasImagens),
    inject: ['DATA_SOURCE'],
  },
];
