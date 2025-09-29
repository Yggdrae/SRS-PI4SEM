import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/db/database.module";
import { SalasRecursosController } from "./salasRecursos.controller";
import { salasRecursosProviders } from "./salasRecursos.providers";
import { SalasRecursosService } from "./salasRecursos.service";

@Module({
    controllers: [SalasRecursosController],
    imports: [DatabaseModule],
    providers: [...salasRecursosProviders, SalasRecursosService]
})

export class SalasRecursosModule { };