import { DataSource } from 'typeorm';
import { Cartao } from './cartoes.entity';

export const cartoesProviders = [
  {
    provide: 'CARTOES_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Cartao),
    inject: ['DATA_SOURCE'],
  },
];