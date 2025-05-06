import { Module } from '@nestjs/common';
import { ExcecoesDisponibilidadeController } from './excecoesDisponibilidade.controller';
import { ExcecoesDisponibilidadeService } from './excecoesDisponibilidade.service';
import { excecoesDisponibilidadeProviders } from './excecoesDisponibilidade.providers';
import { DatabaseModule } from 'src/db/database.module';
import { salasProviders } from 'src/salas/salas.providers';

@Module({
    imports: [DatabaseModule],
    controllers: [ExcecoesDisponibilidadeController],
    providers: [...excecoesDisponibilidadeProviders, ...salasProviders, ExcecoesDisponibilidadeService],
})
export class ExcecoesDisponibilidadeModule {}