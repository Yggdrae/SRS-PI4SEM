import { Module } from "@nestjs/common";
import { UsuariosModule } from "./usuarios/usuarios.module";
import { SalasModule } from "./salas/salas.module";
import { RecursosModule } from "./recursos/recursos.module";
import { ReservasModule } from "./reservas/reservas.module";
import { SalasRecursosModule } from "./salasRecursos/salasRecursos.module";
import { AuthModule } from './auth/auth.module';
import { DisponibilidadeSalasModule } from './disponibilidadeSalas/disponibilidadeSalas.module';
import { DatabaseModule } from "./db/database.module";
import { CartoesModule } from "./cartoes/cartoes.module";


@Module({
    imports: [DatabaseModule, RecursosModule, ReservasModule, SalasModule, SalasRecursosModule, UsuariosModule, AuthModule, DisponibilidadeSalasModule, CartoesModule]
})

export class AppModule { };