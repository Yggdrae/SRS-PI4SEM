import { Controller, Get } from "@nestjs/common";
import { SalasService } from "./salas.service";

@Controller('salas')
export class SalasController{
    constructor(private salasService: SalasService) {}

    @Get()
    getSalas() {
        return this.salasService.getSalas();
    }

    
}