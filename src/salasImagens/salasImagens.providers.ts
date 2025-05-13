import { DataSource } from 'typeorm';
import { SalasImagens } from './salasImagens.entity';
import { Salas } from 'src/salas/salas.entity';

export const salasImagensProviders = [
  {
    provide: 'SALASIMAGENS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(SalasImagens),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'SALAS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Salas),
    inject:['DATA_SOURCE'],
  }
];
