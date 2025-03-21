import { Module } from "@nestjs/common";
import { ReservasController } from "./reservas.controller";
import { DatabaseModule } from "src/db/database.module";
import { reservasProviders } from "./reservas.providers";
import { ReservasService } from "./reservas.service";

@Module({
    controllers: [ReservasController],
        imports: [DatabaseModule],
        providers: [...reservasProviders, ReservasService]
})

export class ReservasModule {};