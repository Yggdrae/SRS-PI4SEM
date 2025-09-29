import { Module } from "@nestjs/common";
import { ReservasController } from "./reservas.controller";
import { DatabaseModule } from "src/db/database.module";
import { reservasProviders } from "./reservas.providers";
import { ReservasService } from "./reservas.service";
import { UsuariosModule } from "src/usuarios/usuarios.module";
import { SalasModule } from "src/salas/salas.module";


@Module({
    controllers: [ReservasController],
    imports: [DatabaseModule, UsuariosModule, SalasModule],
    providers: [...reservasProviders, ReservasService],
    exports: [ReservasService],
})

export class ReservasModule { };