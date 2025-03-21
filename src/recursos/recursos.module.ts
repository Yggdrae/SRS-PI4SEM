import { Module } from "@nestjs/common";
import { RecursosController } from "./recursos.controller";
import { DatabaseModule } from "src/db/database.module";
import { recursosProviders } from "./recursos.providers";
import { RecursosService } from "./recursos.service";

@Module({
    controllers: [RecursosController],
        imports: [DatabaseModule],
        providers: [...recursosProviders, RecursosService]
})

export class RecursosModule {};