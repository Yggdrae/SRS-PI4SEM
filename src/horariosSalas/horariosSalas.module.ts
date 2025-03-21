import { Module } from "@nestjs/common";
import { HorariosSalasController } from "./horariosSalas.controller";
import { DatabaseModule } from "src/db/database.module";
import { horariosSalasProviders } from "./horariosSalas.providers";
import { HorariosSalasService } from "./horariosSalas.service";

@Module({
    controllers: [HorariosSalasController],
        imports: [DatabaseModule],
        providers: [...horariosSalasProviders, HorariosSalasService]
})

export class HorariosSalasModule {};