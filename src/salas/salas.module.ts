import { Module } from "@nestjs/common";
import { SalasController } from "./salas.controller";
import { SalasService } from "./salas.service";
import { DatabaseModule } from "src/db/database.module";
import { salasProviders } from "./salas.providers";

@Module({
    controllers: [SalasController],
        imports: [DatabaseModule],
        providers: [...salasProviders, SalasService]
})

export class SalasModule {};