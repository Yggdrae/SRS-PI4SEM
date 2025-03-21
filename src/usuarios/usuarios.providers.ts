import { DataSource } from 'typeorm';
import { Usuario } from './usuarios.entity';

export const usuariosProviders = [
    {
        provide: 'USUARIOS_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Usuario),
        inject: ['DATA_SOURCE'],
    },
];
