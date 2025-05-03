import { Module } from "@nestjs/common";
import { UsuariosModule } from "./usuarios/usuarios.module";
import { SalasModule } from "./salas/salas.module";
import { HorariosSalasModule } from "./horariosSalas/horariosSalas.module";
import { RecursosModule } from "./recursos/recursos.module";
import { ReservasModule } from "./reservas/reservas.module";
import { SalasRecursosModule } from "./salasRecursos/salasRecursos.module";
import { AuthModule } from './auth/auth.module';
import { DisponibilidadeSalasModule } from './disponibilidadeSalas/disponibilidadeSalas.module';


@Module({
    imports: [HorariosSalasModule, RecursosModule, ReservasModule, SalasModule, SalasRecursosModule, UsuariosModule, AuthModule, DisponibilidadeSalasModule]
})

export class AppModule { };