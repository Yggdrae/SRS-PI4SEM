import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { SalasRecursosService } from "./salasRecursos.service";
import { SalasRecursos } from "./salasRecursos.entity";
import { SalasRecursosInterface } from "./interfaces/salasRecursos.interface";

@Controller('salas_recursos')
export class SalasRecursosController {
    constructor(private salasRecursosService: SalasRecursosService) {}

    @Get()
    getAll(): Promise<SalasRecursos[]> {
        return this.salasRecursosService.getSalasRecursos();
    }

    @Post()
    create(@Body() data: SalasRecursosInterface): Promise<SalasRecursos> {
        return this.salasRecursosService.createSalasRecursos(data);
    }

    @Put(':id')
    update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<SalasRecursosInterface>): Promise<SalasRecursos> {
        return this.salasRecursosService.updateSalasRecursos(id, data);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.salasRecursosService.deleteSalasRecursos(id);
    }
}
