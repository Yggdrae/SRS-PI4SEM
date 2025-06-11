import { Module } from '@nestjs/common';
import { UsuariosModule } from './usuarios/usuarios.module';
import { SalasModule } from './salas/salas.module';
import { RecursosModule } from './recursos/recursos.module';
import { ReservasModule } from './reservas/reservas.module';
import { SalasRecursosModule } from './salasRecursos/salasRecursos.module';
import { AuthModule } from './auth/auth.module';
import { DisponibilidadeSalasModule } from './disponibilidadeSalas/disponibilidadeSalas.module';
import { DatabaseModule } from './db/database.module';
import { CartoesModule } from './cartoes/cartoes.module';
import { PagamentosModule } from './pagamentos/pagamentos.module';
import { ExcecoesDisponibilidadeModule } from './excecoesDisponibilidade/excecoesDisponibilidade.module';
import { SalasImagensModule } from './salasImagens/salasImagens.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './scheduler/tasks.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    DatabaseModule,
    RecursosModule,
    ReservasModule,
    SalasModule,
    SalasRecursosModule,
    UsuariosModule,
    AuthModule,
    DisponibilidadeSalasModule,
    CartoesModule,
    PagamentosModule,
    ExcecoesDisponibilidadeModule,
    SalasImagensModule,
    TasksModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
