import { Module } from "@nestjs/common";
import { UsuariosController } from "./usuarios.controller";
import { UsuariosService } from "./usuarios.service";
import { usuariosProviders } from "./usuarios.providers";
import { DatabaseModule } from "src/db/database.module";

@Module({
    controllers: [UsuariosController],
    imports: [DatabaseModule],
    providers: [...usuariosProviders, UsuariosService],
    exports: [...usuariosProviders, UsuariosService],
})

export class UsuariosModule {};